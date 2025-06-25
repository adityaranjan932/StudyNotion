import React from 'react'
import { FaStar } from 'react-icons/fa'

const StarRating = ({ count = 5, value = 0, onChange, size = 24 }) => {
  const handleStarClick = (rating) => {
    if (onChange) {
      onChange(rating)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {[...Array(count)].map((_, index) => {
        const starValue = index + 1
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(starValue)}
            className="focus:outline-none transition-colors duration-200 hover:scale-110"
          >
            <FaStar
              size={size}
              color={starValue <= value ? "#ffd700" : "#6b7280"}
              className="cursor-pointer"
            />
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
