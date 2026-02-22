import Replicate from "replicate";

if (!process.env.REPLICATE_API_TOKEN) {
    console.warn("Missing REPLICATE_API_TOKEN in environment variables");
}

export const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

/**
 * Common Model Versions for Image Restoration
 */
export const MODELS = {
    // Real-ESRGAN: Upscaling
    UPSCALER: "da28adfd4a694f5d72472d0d0d1a1b022c9e78398864d4d21652878700688193",
    // GFPGAN: Face Restoration
    FACE_RESTORE: "9283608cc6b7be6b658355ee9a2fdeae334224f006c9f7abb782d841a6839992",
    // CodeFormer: Better Face Restoration
    FACE_ENHANCE: "7de2ea11b43d31291b8f52afdd0477b627e7ca4a6a128a3b7c2cc9d9a2d8a0f7",
};
