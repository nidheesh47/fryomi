const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!tokenDecoded){
        return res.status(401).json({ message: "user not autherized" });
    }
    req.user = tokenDecoded;
    next();

} catch (error) {
    return res.status(500).json({ message: error.message });
}
};