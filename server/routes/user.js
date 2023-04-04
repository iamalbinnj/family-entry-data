import express from 'express'
const router = express.Router();

import { addData, getData, getMember } from "../services/render.js"

//Add Data Page
router.get("/add", addData)

//Get Data Page
router.get("/list", getData)

//get Member Page
router.get("/update", getMember)

export default router