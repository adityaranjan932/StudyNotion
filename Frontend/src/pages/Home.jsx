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
        <div className="relative mx-auto my-20 w-full max-w-7xl px-4">
          {/* Animated Background Elements */}
          <div className="absolute -top-16 -left-16 w-96 h-96 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-full opacity-10 blur-3xl animate-pulse floating-element"></div>
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-gradient-to-r from-pink-400 via-yellow-500 to-orange-400 rounded-full opacity-15 blur-3xl animate-pulse floating-element" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-professional opacity-5 rounded-3xl"></div>
          
          {/* Main Video Container */}
          <div className="relative video-container bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 p-3 glow-effect">
            {/* Glass Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-2xl"></div>
            
            {/* Video Element */}
            <div className="relative group overflow-hidden rounded-xl">
              <video 
                className="w-full h-auto object-cover transition-all duration-700 ease-out transform group-hover:scale-105 filter brightness-95 group-hover:brightness-105" 
                muted 
                loop 
                autoPlay
                playsInline
              >
                <source src={Banner} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/20 via-transparent to-richblack-900/10 pointer-events-none"></div>
              
              {/* Corner Decorations */}
              <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-blue-400 rounded-tl-lg opacity-60"></div>
              <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-purple-400 rounded-tr-lg opacity-60"></div>
              <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-green-400 rounded-bl-lg opacity-60"></div>
              <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-yellow-400 rounded-br-lg opacity-60"></div>
              
              {/* Status Indicators */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-richblack-800/90 backdrop-blur-md rounded-full px-4 py-2 border border-richblack-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-richblack-100">Live Learning</span>
              </div>
              
              <div className="absolute top-6 right-6 bg-richblack-800/90 backdrop-blur-md rounded-full px-4 py-2 border border-richblack-600">
                <span className="text-xs font-medium text-richblack-100 flex items-center gap-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  Premium
                </span>
              </div>
              
              {/* Play Button Overlay (appears on hover) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-richblack-900/20 backdrop-blur-sm">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Bottom Reflection Effect */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-4/5 h-20 bg-gradient-to-t from-blue-500/5 via-purple-500/5 to-transparent rounded-full blur-2xl"></div>
          </div>
          
          {/* Enhanced Description */}
          <div className="text-center mt-12 space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-richblack-400 mb-2">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-richblack-400 to-transparent"></div>
              <span>Interactive Learning Experience</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-richblack-400 to-transparent"></div>
            </div>
            <p className="text-base text-richblack-300 max-w-3xl mx-auto leading-relaxed">
              Discover our cutting-edge learning platform where theory meets practice. Experience real-world coding environments, 
              interactive projects, and personalized mentorship that adapts to your learning pace.
            </p>
            
            {/* Feature Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2 text-richblack-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>4K Video Quality</span>
              </div>
              <div className="flex items-center gap-2 text-richblack-400">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Interactive Content</span>
              </div>
              <div className="flex items-center gap-2 text-richblack-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Live Coding Sessions</span>
              </div>
              <div className="flex items-center gap-2 text-richblack-400">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Expert Guidance</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className=" font-semibold text-2xl lg:text-4xl sm:w-full">
                Unlock Your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
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

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
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
