import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// In raasto ko public rakho taaki Clerk Webhook kaam kar sake
const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks(.*)' // Ye sabse important line hai!
]);

export default clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Next.js ke internal files ko ignore karne ke liye
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Hamesha API routes par chale
        '/(api|trpc)(.*)',
    ],
};