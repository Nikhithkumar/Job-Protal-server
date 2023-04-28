// const express=require('express')
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import connectDB from './database/conn.js';
import route from './route/authRouter.js';
import jobRoute from './route/jobRoute.js'
import errorMiddleware from './middleware/errorMiddleware.js';

const app=express()

dotenv.config()


//middleware
app.use(express.json())
app.use(cors())
app.use("/JobProtal",route)
app.use("/JobProtal",jobRoute)
app.use(errorMiddleware)

//mongoDB
connectDB()


//PORT
const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`listening to the ${PORT}`)
})

