import { clerkMiddleware, createRouteMatcher ,clerkClient} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/collections(.*)',
  '/customers(.*)',
  '/orders(.*)',
  '/products(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = auth();
 // Check the session claims
 
  // Skip if the route is not a protected route
  if (!isProtectedRoute(req)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the sign-in page
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Ensure session claims are available before accessing org_role
  if (!sessionClaims) {
    return NextResponse.redirect(new URL('/sign-in', req.url)); // You can customize this based on your needs
  }

  // Check if the user has 'org:admin' role
  const user = await clerkClient.users.getUser(userId);

  // Check for public metadata, specifically the "role" field
  const role = user.publicMetadata?.role;
  // If user is an 'org:admin', allow access to all routes
  if (role === "admin") {
    return NextResponse.next();  // Allow access to all routes for org admins
  }

  // If not an org admin, restrict access to protected routes
  return NextResponse.redirect(new URL('/not-authorized', req.url));
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
