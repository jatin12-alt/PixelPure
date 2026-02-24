# 🌌 PixelPure — AI-Powered Image Restoration SaaS

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk_Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary_AI-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

PixelPure is a high-performance, professional-grade SaaS application designed to breathe new life into digital assets. Leveraging state-of-the-art Generative AI filters, it transforms low-resolution, blurry, or damaged photos into stunning 4K masterpieces with a single click.

---

## 📸 Project Showcase

![PixelPure Preview](https://via.placeholder.com/1200x600/0A0A0F/00F2FF?text=PixelPure+SaaS+Dashboard+Preview)
*Placeholder: Replace with your actual project screenshot*

---

## ✨ Key Features

- **🤖 AI Generative Restoration**: Powered by Cloudinary's neural filters (`e_gen_restore`) to intelligently reconstruct missing pixels and remove artifacts.
- **✨ Interactive Scan-Reveal**: A sleek, custom-built before/after comparison tool with a laser-scan animation effect.
- **🔐 Secure Authentication**: Enterprise-grade user management and multi-factor authentication provided by **Clerk**.
- **💎 Glassmorphism UI**: A modern, high-contrast dark theme built with Tailwind CSS, featuring premium frosted-glass effects and fluid animations.
- **⚡ Real-time Processing**: Instant feedback and toaster notifications for a seamless user experience.
- **📱 Fully Responsive**: Optimized for every screen size, from high-end 4K monitors to small mobile devices.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion, Lucide Icons |
| **Auth** | Clerk Authentication |
| **AI/Media** | Cloudinary AI (Generative Restore), Replicate API |
| **Database** | PostgreSQL (Supabase), Prisma ORM |
| **Payments** | Razorpay (Integration Ready) |
| **State/UI** | Zustand, Sonner (Toasts) |

---

## 🏗️ Architecture & Data Flow

PixelPure follows a modern, decoupled architecture designed for speed and scalability:

1.  **Client Upload**: User selects an image via a hidden file input (Studio Page).
2.  **Cloudinary Gateway**: The image is uploaded directly to Cloudinary using an **Unsigned Upload Preset**.
3.  **AI Transformation**: The frontend generates a transformation URL injecting `e_gen_restore` for real-time neural restoration.
4.  **Interactive Preview**: The `ScanReveal` component fetches both original and transformed assets for side-by-side comparison.
5.  **Secure Download**: The restored asset is fetched as a blob and triggered for a local download to preserve quality.

---

## 🚀 Getting Started

Follow these steps to set up PixelPure on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/pixelpure.git
cd pixelpure
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following keys:

```env
# Database (Supabase/PostgreSQL)
DATABASE_URL="your_postgresql_transaction_url"
DIRECT_URL="your_postgresql_session_url"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Payment Gateway (Optional)
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 4. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the application in action.

---

## 🗺️ Future Roadmap

- [ ] **Subscription Plans**: Full integration with Razorpay for tiered credit systems.
- [ ] **Batch Processing**: Upload and restore multiple images simultaneously.
- [ ] **AI Background Removal**: One-click background extraction using neural networks.
- [ ] **Community Gallery**: A public showcase for users to share their restored masterpieces.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ⚡ by [Your Name]
