const router = require("express").Router();
const ctoj = require("csvtojson")


let matches;


ctoj().fromFile('matches.csv').then((match)=>{
  matches = match

})
router.get("/",(req,res)=>{
    res.json(matches)

    
    
})

router.get("/:matchid",(req,res)=>{
    let data = matches.filter(match=> match.id == req.params.matchid)
    res.json(data)
})


router.get("/:teamname",(req,res)=>{

    let data = matches.filter(match => match.team1 == req.params.teamname || match.team2 == req.params.teamname )
    data.sort((a,b)=>{
        return new Date(b.date) - new Date(a.date)
    })
    res.json(data)  
})

router.get("/:teamname/wins",(req,res)=>{

    let data = matches.filter(match => match.team1 == req.params.teamname || match.team2 == req.params.teamname )
    data = data.filter(item=> item.winner == req.params.teamname)
    data.sort((a,b)=>{
        return new Date(b.date) - new Date(a.date)
    })
    res.json(data)  
})


router.get("/:teamname/:year",(req,res)=>{

    const start = new Date(req.params.year+"-01-01")
    const end = new Date(req.params.year + "-12-31")

    let data = matches.filter(match => match.team1 == req.params.teamname || match.team2 == req.params.teamname )
    let result = data.filter(a=>{
        const date = new Date(a.date)
        return (date >= start && date <= end )
    })
    res.json(result)
})

router.get("/:teamname/:year/wins",(req,res)=>{

    const start = new Date(req.params.year+"-01-01")
    const end = new Date(req.params.year + "-12-31")

    let data = matches.filter(match => match.team1 == req.params.teamname || match.team2 == req.params.teamname )
    data = data.filter(match => match.winner == req.params.teamname)
    let result = data.filter(a=>{
        const date = new Date(a.date)
        return (date >= start && date <= end )
    })
    res.json(result)
})





module.exports = router;