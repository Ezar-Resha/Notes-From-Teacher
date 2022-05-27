"use strict"
const {Teacher, Subject, Student, Document} = require("../models/index.js")
const multer = require('multer');
const upload = multer({dest:'uploads/'}).single("demo_image");

class SubjectController{
    static listSubjects(req,res){

        Subject.findAll({include: Teacher})
        .then((data) =>{
            res.render('subjects',{data})
        })
        .catch((error) =>{
            console.log(error);
            res.send(error);
        })
    }

    static subjectDetail(req,res){
        const id = +req.params.subjectId
        
        Subject.find(id)
        .then((data) =>{
            res.render('subjectdetail', {data})
        })
        .catch((err) =>{
            console.log(err);
            res.send(err)
        })
    }

    static listDocuments(req,res){
        const id = +req.params.subjectId;

        Subject.findByPk(id,{include:Document})
        .then((docs) =>{
            res.render('documentdetail', {docs})
        })
    }

    static upload(req,res){
        const id = +req.params.subjectId;

        Subject.findByPk(id,{include:Document})
        .then((el) =>{
            res.render('upload', {el})
        })
    }

    static uploadProcess(req,res){
        console.log('masuk')
        console.log(req.body)
        console.log(req.file)
        const {name, description} = req.body
        const directory = req.file.path;

        Document.create({
            name:name,
            description:description,
            directory:directory,
            SubjectId:req.params.subjectId
        })
        .then((el) =>{
            console.log('success')
            res.redirect(`/subjects/${req.params.subjectId}/documents`)
        })
        .catch((err) =>{
            console.log(err)
            res.send(err)
        })
        
        // upload(req,res, (err) =>{
        //     if(err) return res.status(400).send("Something went wrong!");
        //     res.send(req.file);
        // })
    }
}


module.exports = SubjectController