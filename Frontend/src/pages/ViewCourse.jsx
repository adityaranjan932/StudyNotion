import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const courseData = await getFullDetailsOfCourse(courseId, token)
        console.log("Course Data here... ", courseData)
        
        // Check if courseData and courseDetails exist
        if (!courseData || !courseData.courseDetails) {
          console.error("No course data received or courseDetails is missing")
          setError("Failed to load course details")
          return
        }

        const { courseDetails, completedVideos = [] } = courseData
        
        // Dispatch course data with safety checks
        dispatch(setCourseSectionData(courseDetails.courseContent || []))
        dispatch(setEntireCourseData(courseDetails))
        dispatch(setCompletedLectures(completedVideos))
        
        // Calculate total lectures with safety checks
        let lectures = 0
        if (courseDetails.courseContent && Array.isArray(courseDetails.courseContent)) {
          courseDetails.courseContent.forEach((sec) => {
            if (sec && sec.subSection && Array.isArray(sec.subSection)) {
              lectures += sec.subSection.length
            }
          })
        }
        dispatch(setTotalNoOfLectures(lectures))
      } catch (error) {
        console.error("Error fetching course details:", error)
        setError("Failed to load course details")
      } finally {
        setLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <p className="text-lg text-richblack-200 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}