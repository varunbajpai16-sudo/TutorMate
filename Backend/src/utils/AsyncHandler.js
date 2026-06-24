
const AsyncHandler = (fu)=> async (req,res,next)=>{
    try{
        await fu(req,res,next);
    }catch(error){
        res.status(error.statusCode || 500).json({
            success:false,
            message:error.message || "Internal Server Error",
        })
    }
}


export default AsyncHandler;