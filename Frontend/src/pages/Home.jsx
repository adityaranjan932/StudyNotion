import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Homepage/CodeBlock";
import TimelineSection from "../components/core/Homepage/TimelineSection";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import InstructorSection from "../components/core/Homepage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/Homepage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className=" mx-auto relative flex flex-col w-11/12 items-center justify-between text-white ">
        <Link to={"/signup"}>
          <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold transition-all duration-200 hover: scale-95 w-fit max-w-maxContent">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-3xl md:text-4xl font-semibold mt-7">
          Empower Your Future With <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" mt-4 w-[90%] text-left md:text-center text-sm md:text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* Professional Video Section */}
        <div className="relative mx-auto my-10 w-full max-w-4xl px-3">
          {/* Subtle Background Elements */}
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-r from-blue-400/15 via-purple-500/15 to-cyan-400/15 rounded-full opacity-80 blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-r from-pink-400/10 via-yellow-500/10 to-orange-400/10 rounded-full opacity-60 blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Main Video Container */}
          <div className="relative group">
            {/* Subtle Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            
            {/* Video Container */}
            <div className="relative bg-gradient-to-br from-richblack-900/95 via-richblack-800/98 to-richblack-900/95 p-1 rounded-xl border border-richblack-700/40 backdrop-blur-sm shadow-xl">
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] rounded-xl pointer-events-none"></div>
              
              {/* Video Element with Fixed Aspect Ratio */}
              <div className="relative overflow-hidden rounded-lg aspect-video bg-richblack-800">
                <video 
                  className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] filter brightness-90 group-hover:brightness-100" 
                  muted 
                  loop 
                  autoPlay
                  playsInline
                >
                  <source src={Banner} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/25 via-transparent to-richblack-900/10 pointer-events-none"></div>
                
                {/* Corner Decorations */}
                <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-blue-400/50 rounded-tl-md"></div>
                <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-purple-400/50 rounded-tr-md"></div>
                <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-green-400/50 rounded-bl-md"></div>
                <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-yellow-400/50 rounded-br-md"></div>
                
                {/* Status Indicators */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-richblack-900/90 backdrop-blur-md rounded-full px-2.5 py-1 border border-richblack-600/50">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-richblack-100">Live</span>
                </div>
                
                <div className="absolute top-2 right-2 bg-richblack-900/90 backdrop-blur-md rounded-full px-2.5 py-1 border border-richblack-600/50">
                  <span className="text-xs font-medium text-richblack-100 flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    HD
                  </span>
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-richblack-900/10 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center border border-white/25 backdrop-blur-md hover:bg-white/25 transition-all duration-300 transform hover:scale-110">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Compact Description */}
          <div className="text-center mt-6 space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-richblack-400">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-richblack-400 to-transparent"></div>
              <span className="text-xs font-medium uppercase tracking-wide">Interactive Learning</span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-richblack-400 to-transparent"></div>
            </div>
            <p className="text-sm text-richblack-300 max-w-2xl mx-auto leading-relaxed">
              Experience hands-on coding with our interactive platform featuring real-time feedback and expert guidance.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-richblack-800/40 rounded-full border border-richblack-700/40 text-xs text-richblack-300">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>4K Quality</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-richblack-800/40 rounded-full border border-richblack-700/40 text-xs text-richblack-300">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Interactive</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-richblack-800/40 rounded-full border border-richblack-700/40 text-xs text-richblack-300">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span>Live Sessions</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-richblack-800/40 rounded-full border border-richblack-700/40 text-xs text-richblack-300">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span>Expert Guidance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Code Block 1 */}
        <div className="relative my-12 overflow-hidden group">        {/* Animated Background Orbs */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-gradient-to-r from-blue-500/20 via-purple-500/25 to-cyan-500/20 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-gradient-to-r from-pink-500/15 via-yellow-500/20 to-orange-500/15 rounded-full blur-3xl animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-green-400/10 via-teal-500/15 to-blue-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Professional Container with Enhanced Effects */}
        <div className="relative">
          {/* Outer Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-purple-600/35 to-cyan-600/30 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-1000 animate-pulse"></div>
          
          {/* Main Content Wrapper */}  
          <div className="code-block-container relative bg-gradient-to-br from-richblack-900/98 via-richblack-800/99 to-richblack-900/98 p-6 lg:p-8 rounded-2xl border border-richblack-700/60 backdrop-blur-2xl shadow-2xl transform transition-all duration-700 hover:scale-[1.01] hover:shadow-3xl overflow-hidden">            {/* Glass Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02] rounded-2xl pointer-events-none"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <CodeBlocks
              position={"lg:flex-row"}
              heading={
                <div className="font-bold text-2xl lg:text-4xl xl:text-5xl sm:w-full leading-tight transform transition-all duration-700 group-hover:scale-105">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent animate-pulse">
                      Unlock Your{" "}
                    </span>
                    <HighlightText text={"coding potential"} />
                    <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent animate-pulse" style={{animationDelay: '0.5s'}}>
                      {" "}with our online courses
                    </span>
                  </div>
                }              subheading={
                <div className="text-base lg:text-lg text-richblack-200 leading-relaxed font-medium transform transition-all duration-700 group-hover:text-richblack-100">
                  Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                </div>
              }
                ctabtn1={{
                  btnText: "Try it yourself",
                  linkto: "/signup",
                  active: true,
                }}
                ctabtn2={{
                  btnText: "learn more",
                  linkto: "/login",
                  active: false,
                }}
                codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                codeColor={"white"}
                backgroudGradient={"grad"}
              />
            </div>
          </div>
        </div>

        {/* Professional Code Block 2 */}
        <div className="relative my-12 overflow-hidden group">
          {/* Animated Background Orbs with Different Theme */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-r from-yellow-500/20 via-orange-500/25 to-red-500/20 rounded-full blur-3xl animate-pulse opacity-60" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-gradient-to-r from-green-500/15 via-teal-500/20 to-blue-500/15 rounded-full blur-3xl animate-pulse opacity-50" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/12 via-pink-500/18 to-rose-500/12 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Professional Container with Enhanced Effects */}
          <div className="relative">
            {/* Outer Glow Effect with Warm Colors */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-600/35 via-orange-600/30 to-red-600/35 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-1000 animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Main Content Wrapper */}
            <div className="code-block-container relative bg-gradient-to-br from-richblack-900/99 via-richblack-800/98 to-richblack-900/99 p-6 lg:p-8 rounded-2xl border border-richblack-700/60 backdrop-blur-2xl shadow-2xl transform transition-all duration-700 hover:scale-[1.01] hover:shadow-3xl overflow-hidden">
              {/* Glass Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02] rounded-2xl pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <CodeBlocks
                position={"lg:flex-row-reverse"}
                heading={
                  <div className="text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight transform transition-all duration-700 group-hover:scale-105">
                    <span className="bg-gradient-to-r from-white via-yellow-100 to-orange-100 bg-clip-text text-transparent animate-pulse">
                      Start{" "}
                    </span>
                    <HighlightText text={"coding in seconds"} />
                  </div>
                }
                subheading={
                  <div className="text-base lg:text-lg text-richblack-200 leading-relaxed font-medium transform transition-all duration-700 group-hover:text-richblack-100">
                    Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
                  </div>
                }
                ctabtn1={{
                  btnText: "Continue Lesson",
                  linkto: "/signup",
                  active: true,
                }}
                ctabtn2={{
                  btnText: "learn more",
                  linkto: "/login",
                  active: false,
                }}
                codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                codeColor={"text-yellow-25"}
                backgroudGradient={"grad2"}
              />
            </div>
          </div>
        </div>
                {/* Explore Section */}
                <ExploreMore />
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3*/}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* section 4 */}
            {/* Footer */}
            <Footer />
    </div>
  );
};

export default Home;
