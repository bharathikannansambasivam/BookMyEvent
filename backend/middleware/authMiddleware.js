import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  console.log(req);
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};
export default protect;
