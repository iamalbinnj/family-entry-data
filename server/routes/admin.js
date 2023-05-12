import express from 'express'
const router = express.Router();

import { addData,createData, getAllData, getDataA, updateData, updataMember, deleteData, deleteMember } from "../controller/admin.js"


//Post Data admin
router.post("/", createData)

//Add Data
router.get("/", addData)

//Get Data
router.get("/list", getAllData)

//get Member
router.get("/update/:id", getDataA)

//Edit Data
router.post("/update/:id", updateData)

//Edit Member
router.post("/updatemember/:id/:memberid", updataMember)

//Delete Data
router.delete("/:id", deleteData)

//Delete Member
router.delete("/:id/:memberid", deleteMember)

export default router