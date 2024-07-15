import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// Genereate JWT Token
export function generateJWT(jwtPayload) {
    const privateKey = process.env.JWT_SECRET;

    const token = jwt.sign(jwtPayload, privateKey, {
        expiresIn: '1h'
    });

    return token;
}


// Set Cookie with JWT
export function setCookie(jwtPayload) {
    const token = generateJWT(jwtPayload);

    const cookie = serialize("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // development=http, production= https
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 1, 
    });

    return cookie;
}