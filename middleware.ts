import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// In routes ko protect karna hai
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Naye version mein hum check karte hain ki kya route protected hai
  if (isProtectedRoute(req)) {
    await auth.protect(); // Yahan await zaroori hai naye Clerk version mein
  }
});

export const config = {
  matcher: [
    // Isko aise hi rehne dena, ye static files ko ignore karta hai
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};