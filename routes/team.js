const router = require("express").Router();
const ctoj = require("csvtojson")

let matches;



ctoj().fromFile('matches.csv').then((match)=>{
  matches = match
})



function teamstats(teamname){
    let  totalmatches = matches.filter(match => match.team1 == teamname || match.team2 == teamname )
    const  wins = matches.filter(match =>  match.winner == teamname)
    totalmatches.sort((a,b)=>{
        return new Date(b.date) - new Date(a.date)
    })
    let match = totalmatches.slice(0,4)

    
    return {
        teamName:teamname,
        matches:match,
        totalMatches:Object.keys(totalmatches).length,
        wins:Object.keys(wins).length,
    }    
}








function teamstatsbyyear (teamname , year){
    const start = new Date(year+"-01-01")
    const end = new Date(year + "-12-31")


    let data = matches.filter(match => match.team1 == teamname || match.team2 ==teamname )
    let result = data.filter(a=>{
        const date = new Date(a.date)
        return (date >= start && date <= end )
    })
    let win = result.filter(match => match.winner == teamname)

    return {
        teamName:teamname,
        year:year,
        totalMatches:Object.keys(result).length,
        wins:Object.keys(win).length

    }
}

router.get("/",(req,res)=>{
    let arr = []
    let teams = ["Chennai Super Kings","Royal Challengers Bangalore","Kolkata Knight Riders","Kings XI Punjab","Rajasthan Royals","Mumbai Indians","Sunrisers Hyderabad","Delhi Capitals",]
    teams.forEach(item => {
        arr.push(teamstats(item))
        
    });
    res.json(arr)
})

// router.get("/:year",(req,res)=>{
//     let arr = []
//     let teams = ["Chennai Super Kings","Royal Challengers Bangalore","Kolkata Knight Riders","Kings XI Punjab","Rajasthan Royals","Mumbai Indians","Sunrisers Hyderabad","Delhi Capitals",]
//     teams.forEach(item => {
//         arr.push(teamstatsbyyear(item , req.params.year))
        
//     });
//     res.json(arr)
// })


router.get("/:teamname",(req,res)=>{
    const team = teamstats(req.params.teamname)
      
    res.json(team)
   
})

router.get("/:teamname/:year",(req,res)=>{
    const start = new Date(req.params.year+"-01-01")
    const end = new Date(req.params.year + "-12-31")

    let data = matches.filter(match => match.team1 == req.params.teamname || match.team2 == req.params.teamname )
    let result = data.filter(a=>{
        const date = new Date(a.date)
        return (date >= start && date <= end )
    })
    let win = result.filter(match => match.winner == req.params.teamname)

    const team = {
        teamName:req.params.teamname,
        year:req.params.year,
        totalMatches:Object.keys(result).length,
        wins:Object.keys(win).length

    }

   
      
    res.json(team)
   
})



module.exports = router;