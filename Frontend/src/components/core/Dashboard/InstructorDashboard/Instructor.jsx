import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

export default function Instructor() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])
    useEffect(() => {
      ;(async () => {
        setLoading(true)
        try {
          const instructorApiData = await getInstructorData(token)
          const result = await fetchInstructorCourses(token)
          console.log(instructorApiData)
          if (instructorApiData && instructorApiData.length) {
            setInstructorData(instructorApiData)
          }          if (result && Array.isArray(result)) {
            // Filter out any invalid course objects
            const validCourses = result.filter(course => 
              course && 
              typeof course === 'object' && 
              course._id &&
              typeof course.studentsEnrolled !== 'undefined'
            );
            setCourses(validCourses)
          } else {
            setCourses([])
          }
        } catch (error) {
          console.error('Error fetching instructor data:', error)
          setCourses([])
          setInstructorData(null)
        }
        setLoading(false)
      })()
    }, [token])
    const totalAmount = instructorData && Array.isArray(instructorData) ? instructorData.reduce(
      (acc, curr) => acc + (curr?.totalAmountGenerated || 0),
      0
    ) : 0
  
    const totalStudents = instructorData && Array.isArray(instructorData) ? instructorData.reduce(
      (acc, curr) => acc + (curr?.totalStudentsEnrolled || 0),
      0
    ) : 0
    // Early return if essential data is missing
    if (!user || !token) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg text-richblack-200">Please log in to view dashboard</p>
        </div>
      )
    }

    return (
      <div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-richblack-5">
            Hi {user?.firstName || 'User'} 👋
          </h1>
          <p className="font-medium text-richblack-200">
            Let's start something new
          </p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="spinner"></div>
          </div>
        ) : courses && courses.length > 0 ? (
          <div>
            <div className="my-4 flex h-[450px] space-x-4">
              {/* Render chart / graph */}
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="flex-1 rounded-md bg-richblack-800 p-6">
                  <p className="text-lg font-bold text-richblack-5">Visualize</p>
                  <p className="mt-4 text-xl font-medium text-richblack-50">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}
              {/* Total Statistics */}
              <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Statistics</p>
                <div className="mt-4 space-y-4">                  <div>
                    <p className="text-lg text-richblack-200">Total Courses</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {courses?.length || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Students</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {totalStudents || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Income</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      Rs. {totalAmount || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-richblack-800 p-6">
              {/* Render 3 courses */}
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                <Link to="/dashboard/my-courses">
                  <p className="text-xs font-semibold text-yellow-50">View All</p>
                </Link>
              </div>              <div className="my-4 flex items-start space-x-6">
                {courses && courses.length > 0 ? courses.slice(0, 3).map((course) => {
                  // Safety check for course object
                  if (!course || !course._id) return null;
                  
                  return (
                  <div key={course._id} className="w-1/3">
                    <img
                      src={course.thumbnail || '/placeholder-image.jpg'}
                      alt={course.courseName || 'Course thumbnail'}
                      className="h-[201px] w-full rounded-md object-cover"
                    />
                    <div className="mt-3 w-full">
                      <p className="text-sm font-medium text-richblack-50">
                        {course.courseName || 'Untitled Course'}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <p className="text-xs font-medium text-richblack-300">
                          {(course.studentsEnrolled && Array.isArray(course.studentsEnrolled)) ? course.studentsEnrolled.length : 0} students
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          |
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          Rs. {course.price || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                  )
                }) : (
                  <div className="text-center text-richblack-300">
                    No courses available
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
            <p className="text-center text-2xl font-bold text-richblack-5">
              You have not created any courses yet
            </p>
            <Link to="/dashboard/add-course">
              <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                Create a course
              </p>
            </Link>
          </div>
        )}
      </div>
    )
  }