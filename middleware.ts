// middleware.ts (or middleware.js)

import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Define your public routes here, for example:
  publicRoutes: ["/api/:path*"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
