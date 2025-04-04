import jwt from 'jsonwebtoken';

// admin authentication middleware
// const authAdmin = async (req, res) => {
//     let token;
//     let authHeader = req.headers.Authorization || req.headers.authorization;
//     if(authHeader && authHeader.startsWith('Bearer')){
//         jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
//             if(error){
//                 console.log(error)
//             }

//         })
//         decode.user
//     }
// }

const authAdmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers
        if(!atoken){
            return res.json({success: false, message: "Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Not Authorized Login Again"})
        }

        next();
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export default authAdmin