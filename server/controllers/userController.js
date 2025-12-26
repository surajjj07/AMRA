import db from "../config/Db.js";
import bcrypt from 'bcryptjs';
import GenerateToken from "../config/token.js";


export const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        const [userExist] = await db.execute(
            "SELECT id FROM user WHERE email=?",
            [email]
        );

        if (userExist.length !== 0) {
            return res.status(409).json({
                status: false,
                message: "User already exists!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            "INSERT INTO user (name,email,password) VALUES (?,?,?)",
            [name, email, hashedPassword]
        );

        const [rows] = await db.execute(
            "SELECT id,name,email FROM user WHERE id=?",
            [result.insertId]
        );

        const token = GenerateToken(rows[0]);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            status: true,
            message: "Signup successful",
            user: rows[0]
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};
  

export const LogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).json({ status: false, message: "All fields are required.." })
        }
        
        const [user] = await db.execute('select * from user where email=?', [email]);
        if (user.length === 0) {
            return res.status(401).json({ status: false, message: "Invalid user..!" });
        }
        const matchPassword = await bcrypt.compare(password, user[0].password)
        if (!matchPassword) {
            return res.status(500).json({ status: false, message: "Invalid User....!" })
        }
        let token = GenerateToken(user[0]);
        console.log("Login token :",token)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
        )
        res.status(200).json({ status: true, message: "User log in..!", user: user[0] })
    } catch (error) {
        res.status(500).json({status:false,message:"Server error...!"})
    }
}


export const logOut = async (req, res) => {
    try {
        res.clearCookie(
            "token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite:"strict"
            }
        )
        res.status(200).json({status:true,message:"User LogOut successfully..!"})
    } catch (error) {
        res.status(501).json({status:false,message:"User is not logged out !"})
    }
}

export const setProfile = async (req, res) => {
    try {
        const ImageUrl = req.file.path;
        const public_id = req.file.filename;
        const user = req.user;
        const update = await db.execute("update user set image =? , cloudinary_id=? where id=?", [ImageUrl, public_id, user.id])
        if (update.length === 0) {
            return res.status(401).json({ status: false, message: "Profile is not updated...!" });
        }
        res.status(200).json({ status: true, message: "Profile_pic is updated successfully...!" });
    } catch (error) {
        res.status(402).json({ status: false, message: "Profile_pic is not updated..!" });
    }
}