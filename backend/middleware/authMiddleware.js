import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {

    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            // No token provided, proceed as a guest
            req.user = null; 
            return next();
        }

        const token = authHeader.split(" ")[1]; // Extract token
        if (!token || token === "null") {
            req.user = null; // No valid token, proceed as guest
            return next();
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized",message: error.message });
    }
}

export default authenticateToken;