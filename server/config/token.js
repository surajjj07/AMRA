import jsonwebtoken from 'jsonwebtoken'

const GenerateToken =(user) => {
    let token = jsonwebtoken.sign(user, process.env.TOKEN_STRING, { expiresIn: "7d" })
    return token;
}

export default GenerateToken