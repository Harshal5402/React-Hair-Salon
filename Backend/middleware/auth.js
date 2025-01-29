import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer token"
    console.log("Extracted Token:", token); // Check token value
    
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.userId = decoded.id; // Ensure `userId` is correctly set here
        console.log("Decoded Token:", decoded);  // Debugging
        console.log("User ID:", req.userId);
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
