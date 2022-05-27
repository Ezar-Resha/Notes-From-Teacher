const express = require("express");
const router = express.Router();
const SubjectController = require('../controllers/subjectcontroller')
const superAdmin = require('../helpers/superadmin')
const multer = require('multer')
const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, "./uploads")    
    },
    filename: (req,file, cb) =>{
        cb(null,  file.originalname)
    },
})
const upload = multer({ storage: fileStorageEngine})

router.get('/', (req,res) => SubjectController.listSubjects(req,res))
router.get('/:subjectId', (req,res) => SubjectController.subjectDetail(req,res))
router.get('/:subjectId/documents', (req,res) => SubjectController.listDocuments(req,res))
router.get('/:subjectId/documents/upload', (req,res) => SubjectController.upload(req,res))
router.post('/:subjectId/documents/upload',upload.single("document") , (req,res) => SubjectController.uploadProcess(req,res))


module.exports = router