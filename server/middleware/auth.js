import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        console.log("token :",token)
        if (!token) {
            return res.json({status:false,message:"Token rquired"})
        }
        const user = jwt.verify(token, process.env.TOKEN_STRING)
        req.user = user;
        next()
    } catch (error) {
        res.status(501).json({status:false,message:"Authorization failed"})
    }
}

export default auth