import * as authService from "../services/authService.js"

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({message: "email and password are required"})
        
        const result = await authService.login({email, password})
        res.json(result)
    } catch(error)  {
        next(error)
    }
}

export {login}