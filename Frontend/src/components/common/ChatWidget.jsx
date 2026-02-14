import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { BsChatDots, BsX, BsSend, BsLightningCharge } from 'react-icons/bs'
import { FaRobot, FaBrain } from 'react-icons/fa'

// Add custom CSS for animations
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
  
  .animate-slideIn {
    animation: slideIn 0.3s ease-out;
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = customStyles
  document.head.appendChild(styleElement)
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnreadMessage, setHasUnreadMessage] = useState(true) // Start with indicator
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your StudyNotion AI assistant! 🚀 I know everything about the platform and can help with course enrollment, dashboard navigation, payments, and more. What can I help you with today?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const [userType, setUserType] = useState('general') // general, student, instructor
  const messagesEndRef = useRef(null)

  // Quick question options based on user type
  const getQuickQuestions = () => {
    const baseQuestions = [
      "How to enroll in a course?",
      "What payment methods do you accept?",
      "Are there any free courses?",
      "Technical support needed"
    ]

    const studentQuestions = [
      "How to track my progress?",
      "Where are my certificates?",
      "How to download videos?",
      "Course completion requirements"
    ]

    const instructorQuestions = [
      "How to create a course?",
      "Upload video guidelines",
      "Student analytics dashboard",
      "Earnings and payouts"
    ]

    if (userType === 'student') {
      return [...baseQuestions, ...studentQuestions.slice(0, 4)]
    } else if (userType === 'instructor') {
      return [...baseQuestions, ...instructorQuestions]
    }

    return [
      "How to enroll in a course?",
      "What payment methods do you accept?",
      "How to become an instructor?",
      "Are there any free courses?",
      "How do I access my dashboard?",
      "Technical support needed",
      "Course completion certificates",
      "Refund policy"
    ]
  }

  const quickQuestions = getQuickQuestions()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // StudyNotion platform context for AI
  const studyNotionContext = `
You are an AI assistant for StudyNotion, an online learning platform. Here's key information about our platform:

PLATFORM OVERVIEW:
- StudyNotion is a comprehensive online course platform
- We offer both free and paid courses (₹0 to ₹999)
- Subjects include: Web Development, DSA, Programming Languages, Database, Mobile Development, DevOps, UI/UX, Career Development
- We support both students and instructors

COURSE FEATURES:
- HD video lectures with playback controls
- Progress tracking and analytics
- Interactive quizzes and assessments
- Downloadable resources and offline viewing
- Course completion certificates
- Discussion forums and community features

PAYMENT & ENROLLMENT:
- Payment via Razorpay (Cards, UPI, Net Banking, Wallets)
- Free courses: instant enrollment (₹0)
- Paid courses: secure payment then instant access
- 30-day money-back guarantee

INSTRUCTOR FEATURES:
- Easy course creation tools
- Video upload and management
- Student analytics dashboard
- Earnings and payout tracking
- Course pricing control

STUDENT FEATURES:
- Personal dashboard with enrolled courses
- Progress tracking and completion status
- Certificate downloads
- Learning streaks and achievements
- Mobile-responsive access

SUPPORT:
- 24/7 chat support
- Email: support@studynotion.com
- Comprehensive FAQ section
- Video tutorials

Answer questions naturally and helpfully. If you don't know something specific, direct users to support@studynotion.com.
`

  // AI-powered response function using backend API
  const getAIResponse = async (userMessage) => {
    try {
      // Ensure userMessage is a clean string
      const cleanMessage = typeof userMessage === 'string' ? userMessage.trim() : String(userMessage || '').trim();

      if (!cleanMessage) {
        throw new Error('Empty message');
      }

      const requestBody = {
        message: cleanMessage,
        userType: userType,
        conversationHistory: messages.slice(-5).map(msg => ({
          text: typeof msg.text === 'string' ? msg.text : String(msg.text || ''),
          isBot: !!msg.isBot
        }))
      };

      console.log('Sending to AI:', requestBody); // Debug log

      const BASE_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${BASE_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: AI service unavailable`)
      }

      const data = await response.json()

      if (data.success && data.response) {
        return {
          text: data.response,
          isAI: data.isAI,
          model: data.model
        }
      }

      throw new Error('Invalid response from AI service')
    } catch (error) {
      console.log('AI service error:', error)
      return {
        text: "I'm having trouble connecting to my AI brain right now 🤖 Please try rephrasing your question or contact support@studynotion.com for immediate help!",
        isAI: false,
        model: 'Error Fallback'
      }
    }
  }

  // Main response function - Pure AI powered
  const getResponse = async (userMessage) => {
    // Ensure userMessage is a string
    const message = typeof userMessage === 'string' ? userMessage : String(userMessage || '');

    if (!message.trim()) {
      return {
        text: "Please ask me something! I'm here to help with any StudyNotion questions. 😊",
        isAI: false,
        model: 'Input Validation'
      };
    }

    // Always use AI - no fallbacks for better experience
    const result = await getAIResponse(message);
    return result;
  }

  const handleSendMessage = async (messageText = input) => {
    // Ensure messageText is a string and has content
    const message = typeof messageText === 'string' ? messageText : String(messageText || '');
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    setShowQuickQuestions(false)

    try {
      // Get AI response
      const result = await getResponse(message)

      // Simulate realistic typing delay based on response length
      const responseText = result.text || result
      const typingDelay = Math.min(Math.max(responseText.length * 30, 1000), 3000)

      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: responseText,
          isBot: true,
          timestamp: new Date(),
          isAI: result.isAI !== undefined ? result.isAI : true,
          model: result.model || 'AI Assistant'
        }
        setMessages(prev => [...prev, botResponse])
        setIsTyping(false)
      }, typingDelay)
    } catch (error) {
      console.error('Error getting response:', error)
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: "Sorry, I'm having trouble processing your request right now. Please try again or contact support@studynotion.com for immediate assistance.",
          isBot: true,
          timestamp: new Date(),
          isAI: false
        }
        setMessages(prev => [...prev, botResponse])
        setIsTyping(false)
      }, 1000)
    }
  }

  const handleQuickQuestion = (question) => {
    handleSendMessage(question)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true)
            setHasUnreadMessage(false)
          }}
          className="bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 text-richblack-900 rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 flex items-center space-x-2 relative border-2 border-yellow-200 hover:border-yellow-300"
        >
          <BsChatDots size={24} />
          <span className="hidden md:block font-semibold">Need Help?</span>
          {hasUnreadMessage && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
              <span className="text-xs text-white font-bold">!</span>
            </div>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-richblack-800 rounded-xl shadow-2xl w-80 md:w-96 h-96 flex flex-col border-2 border-yellow-100 animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 text-richblack-900 p-4 rounded-t-xl flex items-center justify-between border-b border-yellow-200">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FaBrain size={24} className="text-richblack-800" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center">
                  StudyNotion Assistant
                  <BsLightningCharge className="ml-1 text-yellow-600" size={16} />
                </h3>
                <p className="text-xs text-richblack-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  AI-Powered • Ready to help!
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-richblack-200 rounded-full p-2 transition-colors"
            >
              <BsX size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg text-sm transition-all duration-300 relative ${message.isBot
                    ? 'bg-richblack-700 text-richblack-25 rounded-bl-none shadow-md'
                    : 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-richblack-900 rounded-br-none shadow-md'
                    }`}
                  style={{
                    whiteSpace: 'pre-line',
                    animation: 'slideIn 0.3s ease-out'
                  }}
                >
                  {message.text}
                  {message.isBot && message.isAI && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <BsLightningCharge size={10} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))})

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-richblack-700 text-richblack-25 px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-richblack-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-richblack-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-richblack-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* User Type Selection */}
            {messages.length <= 1 && (
              <div className="space-y-3 animate-fadeIn">
                <p className="text-xs text-richblack-300 text-center font-medium">👋 I'm here to help! What describes you best?</p>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => {
                      setUserType('student')
                      const welcomeMsg = {
                        id: Date.now(),
                        text: "Great! I'll help you with student-related questions. What would you like to know?",
                        isBot: true,
                        timestamp: new Date()
                      }
                      setMessages(prev => [...prev, welcomeMsg])
                    }}
                    className={`p-3 rounded-lg text-sm transition-all duration-300 border ${userType === 'student'
                      ? 'bg-yellow-50 text-richblack-900 border-yellow-200'
                      : 'bg-richblack-700 text-richblack-100 border-richblack-600 hover:border-yellow-50'
                      }`}
                  >
                    📚 I'm a Student
                  </button>
                  <button
                    onClick={() => {
                      setUserType('instructor')
                      const welcomeMsg = {
                        id: Date.now(),
                        text: "Perfect! I'll assist you with instructor tools and features. What can I help you with?",
                        isBot: true,
                        timestamp: new Date()
                      }
                      setMessages(prev => [...prev, welcomeMsg])
                    }}
                    className={`p-3 rounded-lg text-sm transition-all duration-300 border ${userType === 'instructor'
                      ? 'bg-yellow-50 text-richblack-900 border-yellow-200'
                      : 'bg-richblack-700 text-richblack-100 border-richblack-600 hover:border-yellow-50'
                      }`}
                  >
                    🎓 I'm an Instructor
                  </button>
                  <button
                    onClick={() => {
                      setUserType('general')
                      setShowQuickQuestions(true)
                    }}
                    className={`p-3 rounded-lg text-sm transition-all duration-300 border ${userType === 'general'
                      ? 'bg-yellow-50 text-richblack-900 border-yellow-200'
                      : 'bg-richblack-700 text-richblack-100 border-richblack-600 hover:border-yellow-50'
                      }`}
                  >
                    ℹ️ General Questions
                  </button>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {showQuickQuestions && messages.length > 1 && userType !== 'general' && (
              <div className="space-y-2 animate-fadeIn">
                <p className="text-xs text-richblack-300 text-center font-medium">✨ Popular questions:</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="w-full text-left text-xs bg-gradient-to-r from-richblack-700 to-richblack-600 hover:from-richblack-600 hover:to-richblack-500 text-richblack-100 p-3 rounded-lg transition-all duration-300 border border-richblack-600 hover:border-yellow-50 transform hover:scale-105"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      💬 {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-richblack-700 bg-richblack-900 rounded-b-xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about StudyNotion..."
                className="flex-1 bg-richblack-700 text-richblack-25 border border-richblack-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-50 focus:ring-2 focus:ring-yellow-50 focus:ring-opacity-50 transition-all duration-300"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 disabled:from-richblack-600 disabled:to-richblack-600 text-richblack-900 disabled:text-richblack-400 rounded-lg p-2 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                <BsSend size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatWidget
