// Script to seed some initial categories
const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();

// Connect to MongoDB using environment variables
mongoose.connect(process.env.MONGODB_URL);

const categories = [
  {
    name: "Web Development",
    description: "Learn to build modern web applications using HTML, CSS, JavaScript, React, Node.js and more"
  },
  {
    name: "Mobile Development",
    description: "Create mobile apps for iOS and Android using React Native, Flutter, and native technologies"
  },
  {
    name: "Data Science",
    description: "Master data analysis, machine learning, and AI using Python, R, and popular frameworks"
  },
  {
    name: "DevOps",
    description: "Learn deployment, CI/CD, containerization with Docker, Kubernetes, and cloud platforms"
  },
  {
    name: "Programming Languages",
    description: "Master programming fundamentals with Python, Java, C++, JavaScript and other languages"
  },
  {
    name: "Database",
    description: "Learn database design, SQL, NoSQL, MongoDB, PostgreSQL, and database optimization"
  },
  {
    name: "DSA",
    description: "Master essential data structures and algorithms concepts for efficient problem-solving and technical interviews"
  }
];

async function seedCategories() {
  try {
    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert new categories
    const result = await Category.insertMany(categories);
    console.log('Categories seeded successfully:', result.length);
    
    // Display created categories
    result.forEach(category => {
      console.log(`- ${category.name}: ${category.description}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();
