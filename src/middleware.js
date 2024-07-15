// import { NextResponse } from 'next/server';
// import {verifyTokenForPage} from "@/utils/verifyToken";


// // Middleware function
// export function middleware(request) {
//     const jwtToken = request.cookies.get('jwtToken');
//     const token = jwtToken?.value;

//     const isAuthPath = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');

//     if (isAuthPath) {
//         if (token && verifyTokenForPage(token)) {
//             // If the user is already authenticated and tries to access login/register, redirect to the home page
//             return NextResponse.redirect(new URL('/', request.url));
//         }
//         // Allow the request to proceed if it's for login/register
//         return NextResponse.next();
//     }

//     if (!token || !verifyTokenForPage(token)) {
//         // If the token is not valid or not present, redirect to the login page
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     // If the token is valid, proceed with the request
//     return NextResponse.next();
// }

// // Config to match all routes
// export const config = {
//     matcher: ['/:path*'], // Apply the middleware to all routes
// };


export function middleware(request) {}