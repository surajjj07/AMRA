
export const getUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(402).json({status:false,message:"Authentication failed"})
        }
        res.status(200).json({status:true,message:"Updated user",user})
    } catch (error) {
        res.status(401).json({ status: true, message: "Auth failed"})
    }
}