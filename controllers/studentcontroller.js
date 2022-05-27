"use strict"
const {Teacher, Subject, Student} = require("../models/index.js")
const formatDate = require('../helpers/formatdate')

class StudentController{

    static listStudent(req, res) {
        const{sort} = req.query;
        const option = {
            attributes:{
                exclude:['createdAt', 'updatedAt'],
            },
        }

        if(sort){
            option.order = [[sort,'asc']]
        };

        Student.findAll(option)
            .then(data => {
                res.render('students', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static detailStudent(req, res) {
        let { studentId } = req.params
        Student.findOne({
            include: {
                model: Subject
            },
            where: {
                id: +studentId
            }
        })
        .then(data => {
            res.render('studentdetail', { data, formatDate })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static editStudent(req, res) {        
        let err = req.query.errors
        let error = null
        if (err) {
            error = err.split(',')
        }
        let { studentId } = req.params
        Student.findOne({
            include: {
                model: Subject
            },
            where: {
                id: +studentId
            }
        })
        .then(data => {
            res.render('formEditStudent', { data, error })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static saveStudent(req, res) {
        let { studentId } = req.params
        let { firstName, lastName, dateOfBirth, email, imageUrl, phoneNumber } = req.body
        Student.update({
            firstName : firstName,
            lastName : lastName,
            dateOfBirth : dateOfBirth,
            email : email,
            imageUrl : imageUrl,
            phoneNumber : phoneNumber
        },
        {
            where: {
                id: + studentId
            }
        })
        .then(() => {
            res.redirect(`/students/${studentId}`)
        })
        .catch(err => {
            if (err.name == 'SequelizeValidationError') {
                let error = []
                err.errors.forEach(el => {
                    error.push(el.message)
                })
                // console.log(error)
                res.redirect(`/students/${studentId}/edit/?errors=${error}`)
            } else {
                res.send(err)
            }
        })
    }

    static deleteStudent(req, res) {
        let { studentId } = req.params
        Student.destroy({
            where: {
                id: studentId
            }
        })
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addStudent(req, res) {
        let error = null
        res.render('addStudent', { error })
    }

    static saveAddStudent(req, res) {
        let { firstName, lastName, dateOfBirth, email, imageUrl, phoneNumber } = req.body
        Student.create({
            firstName, 
            lastName, 
            dateOfBirth, 
            email, 
            imageUrl, 
            phoneNumber
        })
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => {
            if (err.name == 'SequelizeValidationError') {
                let error = []
                err.errors.forEach(el => {
                    error.push(el.message)
                })
                // console.log(error)
                res.render('addStudent', { error })
            } else {
                res.send(err)
            }
        })
    }
}

module.exports = StudentController;