import jwt from 'jsonwebtoken'
const dummyMW = (req,res,next) => {
    const auth = req.headers['authorization'];
    if (!auth){
        return res.status(403)
        .json({
            message:'Unauthorized'
        })
    }
    try{
        const decodedData = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decodedData
        next();
    }
    catch(err){
        return res.status(403)
        .json({
            message:'Unauthorized , JWT has Error'
        })
    }
}

export {dummyMW}