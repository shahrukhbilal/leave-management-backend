const express= require('express')
const app= express()
const port = 5000;
require('dotenv').config()
const dbconnection= require('./dbconnection')
app.use(express.json())
dbconnection()
const leaveroutes= require('./routes/LeaveRoutes')
app.use('/leaves', leaveroutes)

app.listen(port, ()=>{
    console.log('server is running')
})