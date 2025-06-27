import React from 'react'
import CTAButton from "../Homepage/Button"
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroudGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} justify-between items-center gap-10 lg:gap-16 flex-wrap`}>
      
    {/*Section 1 - Text Content*/}
    <div className='flex flex-col gap-8 lg:w-[45%] xl:w-[50%] p-6'>
        <div className="transform transition-all duration-500 hover:scale-[1.02]">
          {heading}
        </div>
        
        <div className='text-richblack-200 font-medium text-base md:text-lg leading-relaxed p-2 transform transition-all duration-500 hover:text-richblack-100'>
            {subheading}
        </div>

        <div className='flex gap-7 mt-6'>
            <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                  <div className='flex gap-2 items-center font-semibold'>
                      {ctabtn1.btnText}
                      <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1"/>
                  </div>
              </CTAButton>
            </div>

            <div className="transform transition-all duration-300 hover:scale-105">
              <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>  
                      {ctabtn2.btnText}
              </CTAButton>
            </div>
        </div>
    </div>

     {/*Section 2 - Code Block*/}
     <div className='relative group lg:w-[50%] xl:w-[45%] max-w-[550px]'> 
        {/* Background Effects */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/25 to-cyan-500/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-700 animate-pulse"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Main Code Container */}
        <div className='relative bg-gradient-to-br from-richblack-900/95 via-richblack-800/98 to-richblack-900/95 backdrop-blur-xl border border-richblack-700/50 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl'> 
          
          {/* Glass Morphism Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] pointer-events-none"></div>
          
          {/* Code Editor Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-richblack-800/80 to-richblack-900/80 border-b border-richblack-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-richblack-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="font-mono">index.html</span>
            </div>
          </div>
          
          {/* Code Content */}
          <div className='flex flex-row min-h-[300px]'>
            {/* Line Numbers */}
            <div className='flex flex-col w-[15%] bg-gradient-to-b from-richblack-900/50 to-richblack-800/50 border-r border-richblack-700/30 text-center py-4 px-2'>
              <div className='text-richblack-400 font-mono text-sm font-medium space-y-2'>
                {[1,2,3,4,5,6,7,8,9,10,11].map((num) => (
                  <p key={num} className="hover:text-richblack-300 transition-colors duration-200 leading-relaxed">{num}</p>
                ))}
              </div>
            </div>

            {/* Code Area */}
            <div className={`w-[85%] flex flex-col font-mono ${codeColor} p-4 relative overflow-hidden`}>
              {/* Background Gradient */}
              <div className={`absolute inset-0 ${backgroudGradient} opacity-60`}></div>
              
              {/* Typing Animation */}
              <div className="relative z-10">
                <TypeAnimation
                  sequence={[codeblock, 2000, ""]}
                  repeat={Infinity}
                  cursor={true}
                  style={{
                    whiteSpace: "pre-line",
                    display: "block",
                    overflowX: "hidden",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    fontFamily: "'Fira Code', 'Consolas', monospace"
                  }}
                  omitDeletionAnimation={true}
                />
              </div>
              
              {/* Syntax Highlighting Overlay Effects */}
              <div className="absolute top-4 right-4 opacity-60">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Status Bar */}
          <div className="flex items-center justify-between p-2 px-4 bg-gradient-to-r from-richblack-900/90 to-richblack-800/90 border-t border-richblack-700/30 text-xs text-richblack-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Ready
              </span>
              <span>HTML</span>
            </div>
            <div className="flex items-center gap-2">
              <span>UTF-8</span>
              <span>•</span>
              <span>Ln 1, Col 1</span>
            </div>
          </div>
        </div>
     </div>
    </div>
  )
}

export default CodeBlocks