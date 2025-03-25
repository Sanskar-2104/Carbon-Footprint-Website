
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) { 
        req.user = null;
        return next();
    }
}

export default authenticateToken;