import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  // Get the token from the header
  const token = req.header("x-auth-token");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, "secret"); // Replace 'yourSecretKey' with your actual secret
    // console.log(decoded);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default verify;
