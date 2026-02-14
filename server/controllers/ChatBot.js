// StudyNotion AI ChatBot using Groq (Free, no billing needed)

// StudyNotion platform context - Comprehensive knowledge base
const STUDYNOTION_CONTEXT = `
You are an AI assistant for StudyNotion, an online learning platform. You know EVERYTHING about this platform. Here's comprehensive information:

WEBSITE STRUCTURE & NAVIGATION:
- Homepage: study-notion-mega-project.vercel.app
- Login: /login page - Sign in with email/password
- Signup: /signup page - Create account (Student/Instructor)
- About Us: /about - Platform information and team
- Contact: /contact - Get in touch form
- Catalog: /catalog - Browse all courses by category

AUTHENTICATION & USER MANAGEMENT:
- JWT-based authentication
- Email verification required for signup
- Password reset via email (Forgot Password link)
- User roles: Student, Instructor, Admin
- Profile management in Dashboard

STUDENT DASHBOARD (/dashboard):
- My Profile: Edit personal information, profile picture
- Enrolled Courses: View all purchased/enrolled courses with progress
- Wishlist: Saved courses for later
- Purchase History: All payment transactions
- Settings: Account preferences and notifications

INSTRUCTOR DASHBOARD (/dashboard):
- My Profile: Instructor information and bio
- My Courses: Create, edit, publish courses
- Add Course: Step-by-step course creation wizard
- Analytics: Student enrollment, revenue, course performance
- Students: View enrolled students in each course

COURSE SYSTEM:
- Course Categories: Web Development, DSA, Programming, Database, Mobile Dev, DevOps, UI/UX, Career
- Course Structure: Sections → SubSections (Videos) → Quizzes
- Video Player: Custom controls, progress tracking, speed settings
- Course Progress: Auto-tracked, percentage completion
- Certificates: Generated on 100% completion

PAYMENT SYSTEM:
- Razorpay Integration: Cards, UPI, Net Banking, Wallets
- Free Courses: ₹0 - Instant enrollment
- Paid Courses: ₹199 to ₹999 range
- Cart System: Add multiple courses, bulk purchase
- 30-day money-back guarantee

INSTRUCTOR FEATURES:
- Course Creation: Upload videos, add descriptions, set pricing
- Video Upload: Cloudinary integration, HD quality support
- Student Management: View enrollment, progress, feedback
- Earnings: 70% revenue share, monthly payouts
- Analytics Dashboard: Detailed course and student insights

STUDENT FEATURES:
- Course Catalog: Filter by category, price, rating
- Video Learning: HD streaming, offline download capability
- Progress Tracking: Real-time completion percentage
- Notes: Take notes during video playback
- Quizzes: Interactive assessments with instant feedback
- Certificates: PDF download, LinkedIn sharing

TECHNICAL DETAILS:
- Built with: React.js (Frontend), Node.js/Express (Backend)
- Database: MongoDB with Mongoose ODM
- File Storage: Cloudinary for videos and images
- Styling: Tailwind CSS with custom yellow/black theme

SUPPORT & HELP:
- Contact Email: support@studynotion.com
- Live Chat: Available 24/7 (that's you!)
- FAQ Section: Common questions and answers
- Video Tutorials: Step-by-step guides

Answer ALL questions about StudyNotion with specific details. If asked about navigation, mention exact routes. If asked about features, explain step-by-step processes. You are the expert on this platform!

Keep responses helpful and under 300 words. Always provide specific navigation paths and exact steps.
`;

exports.getChatResponse = async (req, res) => {
  try {
    const { message, userType = 'general', conversationHistory = [] } = req.body;

    // Handle object conversion issue
    let userMessage = message;
    if (typeof message === 'object') {
      userMessage = JSON.stringify(message);
    }
    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    // Clean the message
    userMessage = userMessage.trim();

    // Prepare the system prompt
    let systemPrompt = STUDYNOTION_CONTEXT;

    if (userType === 'student') {
      systemPrompt += "\n\nThe user is a STUDENT. Focus on student features like course enrollment, dashboard navigation (/dashboard/enrolled-courses), progress tracking, certificates, and learning experience.";
    } else if (userType === 'instructor') {
      systemPrompt += "\n\nThe user is an INSTRUCTOR. Focus on instructor features like course creation (/dashboard/add-course), analytics (/dashboard/instructor), student management, and earnings.";
    }

    // Build messages array for Groq (OpenAI-compatible format)
    const messages = [
      { role: "system", content: systemPrompt }
    ];

    // Add conversation history
    if (conversationHistory.length > 0) {
      conversationHistory.slice(-3).forEach(msg => {
        if (msg && msg.text) {
          messages.push({
            role: msg.isBot ? "assistant" : "user",
            content: msg.text
          });
        }
      });
    }

    // Add current user message
    messages.push({ role: "user", content: userMessage });

    // Call Groq API (OpenAI-compatible, no SDK needed)
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: messages,
          max_tokens: 1024,
          temperature: 0.7
        })
      });

      const data = await response.json();

      if (data.error) {
        console.log("Groq API error:", data.error);
        throw new Error(data.error.message || "Groq API error");
      }

      const aiResponse = data.choices?.[0]?.message?.content;

      if (aiResponse && aiResponse.trim()) {
        return res.status(200).json({
          success: true,
          response: aiResponse.trim(),
          isAI: true,
          model: 'Groq Llama 3.3'
        });
      }
    } catch (groqError) {
      console.log('Groq AI error details:', {
        message: groqError.message,
        status: groqError.status
      });

      // If AI fails, provide a helpful fallback
      return res.status(200).json({
        success: true,
        response: "I'm having trouble connecting to my AI brain right now 🧠 But I'm still here to help! Could you please rephrase your question? For immediate assistance, email support@studynotion.com or try asking about specific StudyNotion features like course enrollment, dashboard navigation, or payment methods.",
        isAI: false,
        model: 'Backup'
      });
    }

    // Fallback
    return res.status(200).json({
      success: true,
      response: "I'm here to help with any StudyNotion questions! Ask me about course enrollment, dashboard features, payment methods, or anything else about the platform.",
      isAI: false,
      model: 'Default'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      success: false,
      message: "I'm having technical difficulties. Please try again or contact support@studynotion.com",
      isAI: false
    });
  }
};

// Health check endpoint
exports.getChatHealth = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "StudyNotion AI Assistant is running",
      timestamp: new Date().toISOString(),
      aiAvailable: !!process.env.GROQ_API_KEY,
      model: 'Groq Llama 3.3 70B',
      capabilities: [
        'Complete StudyNotion platform knowledge',
        'Student and Instructor dashboard guidance',
        'Course enrollment and payment assistance',
        'Navigation and feature explanations',
        'General questions and conversation'
      ]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Chat service error"
    });
  }
};
