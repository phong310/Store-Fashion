const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken; // Lấy token từ cookie

    if (!token) {
        return res.status(401).json("Bạn chưa đăng nhập!");
    }

    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
            return res.status(401).json("Token hết hạn hoặc không hợp lệ!");
        }
        next();
    });
};

module.exports = verifyToken;
