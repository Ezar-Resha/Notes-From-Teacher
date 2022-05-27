"use strict"
const {Teacher, Subject, Student} = require("../models/index.js")


class TeacherController{

    static listTeacher(req, res) {
        const{sort} = req.query;
        const option = {
            attributes:{
                exclude:['createdAt', 'updatedAt'],
            },
        }

        if(sort){
            option.order = [[sort,'asc']]
        };

        Teacher.findAll(option)
            .then(data => {
                res.render('teachers', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static teacherDetail(req, res) {
        let teacherId  = req.params.teacherId
        Teacher.findOne({
            include: Subject,
            where: {
                id: teacherId
            }
        })
        .then(data => {
            res.render('teacherdetail', { data })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static editTeacher(req, res) {        
        let err = req.query.errors
        let error = null
        if (err) {
            error = err.split(',')
        }
        let { teacherId } = req.params
        Teacher.findOne({
            include: {
                model: Subject
            },
            where: {
                id: +teacherId
            }
        })
        .then(data => {
            res.render('formeditteacher', { data, error })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static saveTeacher(req, res) {
        let { teacherId } = req.params
        let { firstName, lastName, email, imageUrl, phoneNumber } = req.body
        Teacher.update({
            firstName : firstName,
            lastName : lastName,
            email : email,
            imageUrl : imageUrl,
            phoneNumber : phoneNumber
        },
        {
            where: {
                id: +teacherId
            }
        })
        .then(() => {
            res.redirect(`/teachers/${teacherId}`)
        })
        .catch(err => {
            if (err.name == 'SequelizeValidationError') {
                let error = []
                err.errors.forEach(el => {
                    error.push(el.message)
                })
                // console.log(error)
                res.redirect(`/teachers/${teacherId}/edit/?errors=${error}`)
            } else {
                res.send(err)
            }
        })
    }

}

module.exports = TeacherController;