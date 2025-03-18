const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const UsersModel = require("../models/UsersModel")

const AuthController = {
    // Tạo access Token
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            role: user.Role
        },
            process.env.JWT_ACCESS_KEY, { expiresIn: "1d" }
        )
    },

    // Tạo refresh Token
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                Role: user.Role
            },
            process.env.JWT_REFESH_KEY, { expiresIn: "365d" }
        )
    },

    // REGISTER 
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const hashConfirmPass = await bcrypt.hash(req.body.confirm, salt)

            // create new
            const newUser = await new UsersModel({
                username: req.body.username,
                avatar: "",
                email: req.body.email,
                password: hashedPassword,
                confirm: hashConfirmPass,
                phone: "NaN",
                birthday: 0,
                sex: "Nam",
                address: "NaN",
                Role: "USER",
                status: "inactive"
            })

            const user = await newUser.save();
            res.status(200).json(user)

        } catch (e) {
            res.status(500).json({ Err: e.message })
        }

    },


    // LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await UsersModel.findOne({
                email: req.body.email
            });

            if (!user) {
                return res.status(500).json("Wrong email !");
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) {
                return res.status(500).json("Wrong password !");
            }

            const accessToken = AuthController.generateAccessToken(user);
            const refreshToken = AuthController.generateRefreshToken(user);

            // lưu refresh token vào cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            res.status(200).json({ user, accessToken, refreshToken });
        } catch (e) {
            console.error("Error while finding user", e.message);
            res.status(500).json({ err: e.message });
        }
    },


    // LOGOUT
    logoutUser: async (req, res) => {
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        res.status(200).json("Logout success !")
    }
}

module.exports = AuthController