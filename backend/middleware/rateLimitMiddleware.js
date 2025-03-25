import rateLimit from "express-rate-limit";

const guestRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Limit to 10 requests per hour per IP
    message: { error: "Too many calculations! Please try again later." },
});

export default guestRateLimiter