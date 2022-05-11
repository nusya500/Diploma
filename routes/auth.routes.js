const { Router } = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const User = require("../models/User")
require("dotenv").config()
const router = Router()

// api/auth/register
router.post("/register", [
        check("password", "Minimum length of password is 6").isLength({ min: 6 })],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при регистрации"
            })
        }

        const { login, password, fullname, email, age } = req.body

        const candidate = await User.findOne({ login })

        if (candidate) {
            return res.status(400).json({ message: "Этот login уже занят" })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({ login, password: hashedPassword, fullname, email, age })

        await user.save()

        res.status(201).json({ message: "Пользователь создан" })
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

// api/auth/login
router.post(
    "/login",
    [
        check("password", "Enter a password").exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при входе"
            })
        }

        const { login, password } = req.body

        const user = await User.findOne({ login })

        if (!user) {
            return res.status(400).json({ message: "Пользователь не найден" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Неверный пароль" })
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET
        )

        res.json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

router.get("/:id", [], async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
  
    } catch (e) {
        res.status(500).json({ error: "Что-то пошло не так, попробуйте снова" });
    }
})

module.exports = router