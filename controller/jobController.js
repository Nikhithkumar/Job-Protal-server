import jobModel from "../models/jobModel.js"

//POST api to create api
export const createJobController=async(req,res,next)=>{
    try{
        const{company,position,jobType}=req.body
        if(!company||!position){
            next('Please Provide Required job details')
        }
        
        //teaching job not allowed
        if(jobType==='Teaching'){
            next('Teaching job is not allowed')
        }
        const newJob={
            company,
            position,
            jobType
        }
        const job = await jobModel.create(newJob)
        res.status(200).json({
            success:true,
            message:'job added sucessfully'
        })
    }
    catch(err){
        next('error in createJobController')
        err
    }
   
    
}

//GET api to get all jobs
export const getAllJobController=async(req,res,next)=>{
    try{

        const jobs=await jobModel.find()
        res.status(200).json({
            success:'true',
            jobs,
            totalJobs:jobs.length
            
        })
    }
    catch(err){
        next('error in getAllController')
        err
    }
}

//patch api to update the job observation
export const updateJobController=async(req,res,next)=>{
    try{
        const {id}=req.params
        const {workLocation,position}=req.body

        if(!workLocation||!position){
            next('provide the valid fields')
        }

        const job=await jobModel.findOne({_id:id})

        if(!job){
            next(`no job found with this ${id}`)
        }

        const updateJob=await jobModel.findByIdAndUpdate({_id:id},{
            workLocation,
            position
        })

        res.status(200).json({
            updateJob
        })
    }
    catch(err){
        next('error in updateJobController')
    }
}

//delete job in api 
export const deleteJobController=async(req,res,next)=>{
    try{

        const {id}=req.params
        const job=await jobModel.findOne({_id:id})

        if(!id){
            next('no job found')
        }

        await job.deleteOne({_id:id});

        res.status(200).json({
            message:'job sucessfully deleted',
            success:true
        })

    }
    catch(err){

    }
}