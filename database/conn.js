import mongoose from 'mongoose';

 const connectDB=async()=>{
    try{

       const conn= await mongoose.connect(process.env.MONGODB_URL)
            console.log('SUCESSFULLY CONNECTED TO MANGODB')
    
    }
    catch(error){
        console.log(`mongodb error:${error}`)
    }
}

export default connectDB