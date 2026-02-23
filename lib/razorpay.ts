import Razorpay from "razorpay";

// Build ke waqt error na aaye isliye hum fallback strings use karenge
const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_dummy_id";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "dummy_secret";

export const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
});