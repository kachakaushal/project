import userModel from "../models/userModel.js";
import { comparepassword, hashPassword } from "../helpers/authHelper.js";
import JWT from 'jsonwebtoken';


export const ragisterController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        if (!name) {
            return res.send({ error: 'name is required' })
        }
        if (!email) {
            return res.send({ error: 'email is required' })
        }
        if (!password) {
            return res.send({ error: 'password is required' })
        }
        if (!phone) {
            return res.send({ error: 'phone no is required' })
        }
        if (!address) {
            return res.send({ error: 'address is required' })
        }

        //check user 
        const existingUser = await userModel.findOne({ email })
        //existing user 
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'already ragister please login'
            })
        }
        //ragister user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save()

        res.status(201).send({
            success: true,
            message: 'user register succesfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in Register",
            error
        })
    }
}

//post login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || password) {
            return res.status(404).send({
                success: false,
                message: "invalid username or password"
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "email is not ragisterd"
            })
        }
        const match = await comparepassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'invalid password'
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_secret, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: "login succesfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            }, token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in login',
            error
        })
    }

}
