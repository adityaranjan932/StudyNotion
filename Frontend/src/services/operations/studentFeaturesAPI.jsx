import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
// import rzpLogo from "../../assets/Images/rzp.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        // Check if we're in development mode
        if (import.meta.env.VITE_APP_MODE === 'development') {
            // Development mode - simulate successful payment
            console.log("DEVELOPMENT MODE: Simulating successful payment");
            
            // Simulate payment success directly
            const mockPaymentResponse = {
                razorpay_order_id: "order_dev_" + Date.now(),
                razorpay_payment_id: "pay_dev_" + Date.now(),
                razorpay_signature: "dev_signature_" + Date.now()
            };
            
            // Call verify payment directly
            await verifyPayment({...mockPaymentResponse, courses}, token, navigate, dispatch);
            toast.dismiss(toastId);
            return;
        }

        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }//initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                {courses},
                                {
                                    Authorization: `Bearer ${token}`,
                                });

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);
        console.log("RAZORPAY_KEY:", import.meta.env.VITE_RAZORPAY_KEY);
        console.log("Order Data:", orderResponse.data.data);
        
        //options
        const options = {key: import.meta.env.VITE_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            // image: rzpLogo, // Removed to fix mixed content error
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },            handler: function(response) {
                console.log("Razorpay payment successful:", response);
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        
        paymentObject.on("payment.failed", function(response) {
            console.log("Payment failed response:", response.error);
            
            // If payment fails due to test mode issues, offer alternative
            if (import.meta.env.VITE_APP_MODE === 'development') {
                toast.error("Payment failed. Would you like to proceed with test enrollment?");
                
                // Give option to proceed with test enrollment
                setTimeout(() => {
                    if (confirm("Payment failed in test mode. Proceed with test enrollment?")) {
                        const mockPaymentResponse = {
                            razorpay_order_id: "order_dev_fallback_" + Date.now(),
                            razorpay_payment_id: "pay_dev_fallback_" + Date.now(),
                            razorpay_signature: "dev_signature_fallback_" + Date.now()
                        };
                        verifyPayment({...mockPaymentResponse, courses}, token, navigate, dispatch);
                    }
                }, 2000);
            } else {
                toast.error("Payment failed: " + (response.error?.description || "Unknown error"));
            }
        })

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}