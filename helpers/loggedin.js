function loggedIn(req,res,next){
    if(!req.session.userId){
        const err = "You must be logged in to access that page"
        res.redirect(`/login?err=${err}`)
    } else{
        next()
    }
}

module.exports = loggedIn