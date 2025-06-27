import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div
      className={`group relative w-[360px] lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl border-2 border-yellow-400/50 transform scale-105"
          : "bg-gradient-to-br from-richblack-800/95 via-richblack-700/98 to-richblack-800/95 border border-richblack-600/40 hover:border-richblack-500/60"
      } h-[320px] rounded-2xl cursor-pointer transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl backdrop-blur-md overflow-hidden`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
        currentCard === cardData?.heading 
          ? "bg-gradient-to-br from-yellow-400/10 via-orange-400/15 to-yellow-400/10" 
          : "bg-gradient-to-br from-blue-500/5 via-purple-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100"
      }`}></div>
      
      {/* Glass Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02] rounded-2xl pointer-events-none"></div>
      
      {/* Content Container */}
      <div className="relative h-full flex flex-col">
        {/* Main Content */}
        <div className="border-b border-richblack-400/30 border-dashed h-[75%] p-8 flex flex-col gap-4">
          {/* Heading */}
          <div
            className={`${
              currentCard === cardData?.heading 
                ? "text-richblack-800 bg-gradient-to-r from-richblack-800 via-richblack-700 to-richblack-800 bg-clip-text text-transparent" 
                : "text-white group-hover:text-cyan-100"
            } font-bold text-xl lg:text-2xl leading-tight transition-all duration-300`}
          >
            {cardData?.heading}
          </div>

          {/* Description */}
          <div className={`${
            currentCard === cardData?.heading 
              ? "text-richblack-600" 
              : "text-richblack-300 group-hover:text-richblack-200"
          } text-sm lg:text-base leading-relaxed transition-all duration-300`}>
            {cardData?.description}
          </div>
        </div>

        {/* Footer Stats */}
        <div
          className={`flex justify-between items-center ${
            currentCard === cardData?.heading 
              ? "text-blue-600" 
              : "text-richblack-400 group-hover:text-richblack-200"
          } px-8 py-6 font-medium text-sm lg:text-base transition-all duration-300`}
        >
          {/* Level */}
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              currentCard === cardData?.heading 
                ? "bg-blue-100" 
                : "bg-richblack-700/50 group-hover:bg-richblack-600/50"
            } transition-all duration-300`}>
              <HiUsers className="text-lg" />
            </div>
            <span className="font-semibold">{cardData?.level}</span>
          </div>

          {/* Lessons */}
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              currentCard === cardData?.heading 
                ? "bg-blue-100" 
                : "bg-richblack-700/50 group-hover:bg-richblack-600/50"
            } transition-all duration-300`}>
              <ImTree className="text-lg" />
            </div>
            <span className="font-semibold">{cardData?.lessionNumber} Lessons</span>
          </div>
        </div>
        
        {/* Hover Border Effect */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
          currentCard === cardData?.heading
            ? "border-2 border-yellow-400/60 opacity-100"
            : "border border-blue-400/0 group-hover:border-blue-400/40 opacity-0 group-hover:opacity-100"
        }`}></div>
      </div>
    </div>
  );
};

export default CourseCard;