export default function GetAvgRating(ratingArr) {
  // Check if ratingArr is falsy or empty
  if (!ratingArr || !Array.isArray(ratingArr) || ratingArr.length === 0) {
    return 0
  }
  
  const totalReviewCount = ratingArr.reduce((acc, curr) => {
    // Ensure curr.rating is a valid number
    const rating = Number(curr?.rating)
    if (!isNaN(rating)) {
      acc += rating
    }
    return acc
  }, 0)

  const multiplier = Math.pow(10, 1)
  const avgReviewCount =
    Math.round((totalReviewCount / ratingArr.length) * multiplier) / multiplier

  // Ensure we return a valid number, not NaN
  return isNaN(avgReviewCount) ? 0 : avgReviewCount
}