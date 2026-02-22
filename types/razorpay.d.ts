interface RazorpayOptions {
    key: string | undefined;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    order_id: string;
    handler?: (response: RazorpayPaymentResponse) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    theme?: {
        color?: string;
    };
    modal?: {
        ondismiss?: () => void;
    };
    [key: string]: unknown;
}

interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface RazorpayInstance {
    open(): void;
    on(event: string, handler: (response: RazorpayPaymentResponse) => void): void;
}

interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}
