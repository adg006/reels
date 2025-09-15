import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.partnerId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};

export default authMiddleware;
