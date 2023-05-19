import express from 'express'
const router = express.Router();

import { addData, getAllData, getMember, getEditMember, createData, updateData, updateMember, deleteData, deleteMember } from "../controller/admin.js"

//Get Add Data Page
router.get("/", addData)

//Get Data Page
router.get("/list", getAllData)

//Get Member Page
router.get("/view/:id", getMember)

//Get Edit Member Page
router.get("/edit/:id/:memberid", getEditMember)

//Post Data admin
router.post("/", createData)

//Edit Data
router.post("/update/:id", updateData)

//Edit Member
router.post("/updatemember/:id/:memberid", updateMember)

//Delete Data
router.delete("/:id", deleteData)

//Delete Member
router.delete("/:id/:memberid", deleteMember)

export default router