import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import { FaStar } from "react-icons/fa"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../Common/IconBtn"
import StarRating from "../../common/StarRating"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  const [currentRating, setCurrentRating] = useState(0)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setCurrentRating(newRating)
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    if (data.courseRating === 0) {
      toast.error("Please select a rating for the course")
      return
    }
    
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <div className="flex flex-col items-center space-y-2 mb-4">
              <label className="text-sm text-richblack-5">
                Rate this course <sup className="text-pink-200">*</sup>
              </label>
              
              {/* Try ReactStars first, fallback to custom StarRating */}
              <div className="flex items-center justify-center p-2 bg-richblack-700 rounded-md">
                <StarRating
                  count={5}
                  value={currentRating}
                  onChange={ratingChanged}
                  size={30}
                />
              </div>
              
              {/* Alternative: ReactStars component (comment out StarRating above and uncomment this) */}
              {/* 
              <div className="flex items-center justify-center p-2 bg-richblack-700 rounded-md">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={30}
                  activeColor="#ffd700"
                  color="#6b7280"
                  isHalf={false}
                  value={currentRating}
                />
              </div>
              */}
              
              {currentRating > 0 && (
                <p className="text-sm text-richblack-200">
                  You rated: {currentRating} star{currentRating !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Cancel
              </button>
              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}