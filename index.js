const express = require("express")
const teamroute = require("./routes/team")
const matchroute = require("./routes/match")


const app = express();



app.use(express.json())
app.use("/api/match",matchroute)
app.use("/api/team",teamroute)



app.listen(8080,()=>{
    console.log("backend is ready ")
})

