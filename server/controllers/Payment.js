const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mailsTemplates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mailsTemplates/paymentSuccessfulEmail")
const CourseProgress = require("../models/CourseProgress")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // Handle free courses (total amount = 0)
  if (total_amount === 0) {
    // For free courses, return a special response indicating no payment needed
    return res.json({
      success: true,
      message: "Course is free, no payment required",
      data: {
        amount: 0,
        currency: "INR",
        id: "free_course_" + Date.now(),
        isFree: true
      }
    })
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log("Razorpay Order Created Successfully:", paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log("Razorpay Order Creation Error:", error)
    console.log("Error Details:", error.error)
    res
      .status(500)
      .json({ 
        success: false, 
        message: "Could not initiate order.",
        error: error.message
      })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses

    const userId = req.user.id

    console.log("verifyPayment - received data:", {
      razorpay_order_id,
      razorpay_payment_id,
      courses,
      userId
    })

    if (!courses || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide courses and user information" 
      })
    }

    // Development mode bypass, test payment, or free course
    if (process.env.NODE_ENV === 'development' || 
        razorpay_order_id?.startsWith('order_dev_') ||
        razorpay_order_id?.startsWith('free_course_') ||
        razorpay_payment_id?.startsWith('free_payment_') ||
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature) {
      console.log("BYPASSING PAYMENT VERIFICATION: Development mode, test payment, or free course");
      await enrollStudents(courses, userId, res)
      return
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature === razorpay_signature) {
      await enrollStudents(courses, userId, res)
      return
    }

    return res.status(400).json({ success: false, message: "Payment verification failed" })
  } catch (error) {
    console.error("verifyPayment error:", error)
    return res.status(500).json({ 
      success: false, 
      message: "Payment verification failed", 
      error: error.message 
    })
  }
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  try {
    for (const courseId of courses) {
      console.log(`Enrolling user ${userId} in course ${courseId}`)
      
      // Check if user is already enrolled
      const existingCourse = await Course.findById(courseId)
      if (!existingCourse) {
        return res
          .status(404)
          .json({ success: false, message: "Course not found" })
      }

      // Check if already enrolled
      if (existingCourse.studentsEnrolled.includes(userId)) {
        console.log(`User ${userId} already enrolled in course ${courseId}`)
        continue
      }

      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $addToSet: { studentsEnrolled: userId } }, // Use $addToSet to avoid duplicates
        { new: true }
      )

      console.log("Updated course: ", enrolledCourse?.courseName)

      // Check if course progress already exists
      let courseProgress = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })

      if (!courseProgress) {
        courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        })
      }

      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { // Use $addToSet to avoid duplicates
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent.firstName)

      // Send an email notification to the enrolled student
      try {
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        )
        console.log("Email sent successfully")
      } catch (emailError) {
        console.log("Email sending failed:", emailError)
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: "Students enrolled successfully",
      data: "Enrollment completed"    })
  } catch (error) {
    console.log("enrollStudents error:", error)
    return res.status(500).json({ 
      success: false, 
      message: "Failed to enroll student", 
      error: error.message 
    })
  }
}