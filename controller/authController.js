import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'

export const registerController=async(req,res,next)=>{
 try{
    const{name,email,password}=req.body

    //validate
    if(!name){
        next('name is required')//next is a method to integrating middleware
    }
    if(!email){
        
        next('please provide the email')
    }
    if(!password){
        
        next('please provide the password')
    }

    // check the store data
    const existingUser= await userModel.findOne({email})
    if(existingUser){
        return res.status(200).send({
            success:true,
            message:'email is already there'
        })
    }

    //store the data
    const newUser={
        name:name,
        email:email,
        password:bcrypt.hashSync(password)//encrypting the password
    }
    const user=userModel.create(newUser)
    // console.log("new user...",user)
    res.status(200).send({
        success:true,
        message:'User is Register Sucessfully',
        user
    })
 }
 catch(err){
    next('Error is Register controller')
 }
}

 //********login***********//

 
export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body

        //validate
        if (!email || !password) {
            next('provide all fields')
        }

        const user = await userModel.findOne({ email })
        console.log(user)
        const isPassword = bcrypt.compareSync(password, user.password)
        if (!user.email || !isPassword) {
            res.status(400).send({
                success: false,
                message: 'Invaild email and password'
            })
            // next('invalid email and password')
            if (!isPassword) {
                res.status(200).send({
                    success: false,
                    message: 'password incorrect',
                    user
                })
            }
        } else {
            // if(){
            //     res.status(200).send({
            //         success: false,
            //         message: 'password incorrect',
            //         user
            //     })
            // }
            res.status(200).json({
                success: true,
                message: "user login sucessfully"
            })
        }
    }
    catch (err) {
        next('Error is login controller')
    }
}