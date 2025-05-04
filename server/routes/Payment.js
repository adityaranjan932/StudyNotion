// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payment")


// console.log({ capturePayment, verifyPayment, sendPaymentSuccessEmail });

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// console.log({ auth, isInstructor, isStudent, isAdmin });


router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment",auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;
