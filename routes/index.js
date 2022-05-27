const UserController = require('../controllers/usercontroller')
const loggedin = require('../helpers/loggedin')
const router = require('express').Router()
const session = require("express-session")


// Landing Page
router.get('/', (req,res) => UserController.login(req,res))
router.get('/login', (req,res) => UserController.login(req,res))
router.post('/login', (req,res) => UserController.loginProcess(req,res))
router.get('/register', (req,res) => UserController.register(req,res))
router.post('/register', (req,res) => UserController.registerProcess(req,res))
// router.get('/:userId', (req,res) => UserController.userLanding(req,res))

router.use (loggedin)

router.get('/home', (req,res) => res.render('home'))
router.get('/logout', (req,res) => UserController.logout(req,res))

router.use('/students', require("./student"))   
router.use('/teachers', require("./teacher"))
router.use('/subjects', require("./subject"))


module.exports = router;