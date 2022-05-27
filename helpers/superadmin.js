function superAdmin(req,res,next){
    console.log(req.session.role)
    if(req.session.role !== "SuperAdmin"){
        res.redirect('/home')
    } else{
        next()
    }
}

module.exports = superAdmin;