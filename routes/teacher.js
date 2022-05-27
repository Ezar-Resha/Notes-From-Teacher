const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/teachercontroller")
const superAdmin = require('../helpers/superadmin')

router.get('/', (req,res) => TeacherController.listTeacher(req,res))
router.get('/:teacherId' , (req,res) => TeacherController.teacherDetail(req,res))

router.use(superAdmin)

router.get('/:teacherId/edit', (req,res) => TeacherController.editTeacher(req,res))
router.post('/:teacherId/edit', (req,res) => TeacherController.saveTeacher(req,res))
module.exports = router;
