import jwt from 'jsonwebtoken';


// Verify Token For API End Point
export function verifyToken(request) {
    try {
        const jwtToken = request.cookies.get("jwtToken");
        const token = jwtToken?.value ;
        if (!token) return null;

        const privateKey = process.env.JWT_SECRET ;
        const userPayload = jwt.verify(token, privateKey);

        return userPayload;
    } catch (error) {
        return null;
    }
}

// Verify Token For Page
export function verifyTokenForPage(token) {
    try {
        const privateKey = process.env.JWT_SECRET ;
        const userPayload = jwt.verify(token, privateKey) ;
        if(!userPayload) return null;

        return userPayload;
    } catch (error) {
        return null;
    }
}