const express = require("express");
const router = express.Router();
const session = require("express-session")
const StudentController = require("../controllers/studentcontroller");

const superAdmin = require("../helpers/superadmin")

router.get('/', (req,res) => StudentController.listStudent(req,res))
router.get('/:studentId', (req,res) => StudentController.detailStudent(req,res))

router.use(superAdmin)

router.get('/:studentId/edit', (req,res) => StudentController.editStudent(req,res))
router.post('/:studentId/edit', (req,res) => StudentController.saveStudent(req,res))
router.get('/:studentId/delete', (req,res) => StudentController.deleteStudent(req,res))
module.exports = router;
