//creating sapareat error file in project 
const errorMiddleware=(err,req,res,next)=>{
    next()
    res.status(500).send({
        message:"Something went wrong",
        success:false,
        err
    })
}

export default errorMiddleware