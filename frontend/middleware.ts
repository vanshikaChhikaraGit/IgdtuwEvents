import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export default clerkMiddleware(async (auth, request) => {
  // Check if the route is public using the request object
  if (isPublicRoute(request)) {
    return;
  }

  // Enforce authentication for all other routes
  await auth.protect();
});

export const config = {
  matcher: [
    // Protect all routes except Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always protect API routes
    '/(api|trpc)(.*)',
  ],
};
