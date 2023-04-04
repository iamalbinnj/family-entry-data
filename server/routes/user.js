import express from 'express'
const router = express.Router();

import {createData,getAllData,getDataA,updateData,updataMember,deleteData,deleteMember} from "../controller/admin.js"
import { addData, getData, getMember } from "../services/render.js"

//Add Data Page hbs
router.get("/", addData)

//Post Data admin
router.post("/",createData)

//-------------

//Get All Data admin
router.get("/lists",getAllData)

//Get Data Page hbs
router.get("/list", getData)

//---------------


//Admin
router.get("/get/:id",getDataA)


//get Member Page HBS
router.get("/update", getMember)



//Edit Data admin
router.put("/update/:id",updateData)

//Edit Member Data admin
router.put("/update/:userid/:memberid",updataMember)



//Delete Data admin
router.delete("/:id",deleteData)

//Delete Member Data admin
router.delete("/:userid/:memberid",deleteMember)


export default router