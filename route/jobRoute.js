import express from "express";
import { createJobController, deleteJobController, getAllJobController, updateJobController } from "../controller/jobController.js";

const jobRoute=express.Router()

//creatin the jobs
jobRoute.post('/create-jobs',createJobController)

//fetching the All jobs
jobRoute.get('/get-jobs',getAllJobController)

//put is to update entier opservation
//patch is to update some queeu info
jobRoute.patch('/update-job/:id',updateJobController)

//deleteing the jobs
jobRoute.delete('/delete-job/:id',deleteJobController)

export default jobRoute

