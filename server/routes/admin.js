import express from 'express'
import {createData,getAllData,getData,updateData,updataMember,deleteData,deleteMember} from "../controller/admin.js"
const router = express.Router();

//Post Data
router.post("/",createData)

//Get All Data
router.get("/",getAllData)

//Get Data
router.get("/:id",getData)

//Edit Data
router.put("/update/:id",updateData)

//Edit Member Data
router.put("/update/:userid/:memberid",updataMember)

//Delete Data
router.delete("/:id",deleteData)

//Delete Member Data
router.delete("/:userid/:memberid",deleteMember)

export default router