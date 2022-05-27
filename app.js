const express = require('express');
const app = express();
const port = process.env.PORT || 3002
const multer  = require('multer')

const router = require('./routes/index');
const session = require('express-session')



// app.use(multer)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,
  maxAge:600000} // 10 minute
  })
)
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.use(router)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
