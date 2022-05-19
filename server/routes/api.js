const express = require('express')
const router = express.Router()
const Expense = require('/home/basemcode/Desktop/Elevation/Projects/mongoose-expenses-project/model/Expense')
const moment = require('moment')


//2018-02-05T19:10:00.000Z
//2018-01-02T15:21:00.000Z
router.get('/expenses',function(req,res){
    let d1 = req.query.d1
    let d2 = req.query.d2
    if(d2!=undefined&&d1!=undefined){
        Expense.find({
            $and:[
                {date:{$gt:d1}},
                {date:{$lt:d2}}
    
            ]
        },function(err,results){
            res.send(results)
        }).sort("date")
    }
    else if(d1!==undefined&&d2===undefined){
        Expense.find({
            $and:[
                {date:{$gt:d1}},
                {date:{$lt:moment().format()}}
    
            ]
        },function(err,results){
            res.send(results)
        }).sort("date")
    }else if(d1===undefined&&d2===undefined){
        Expense.find({},function(err,expenses){
            res.send(expenses)
        }).sort("date")
    }
})

router.post('/expense',function(req,res){
    let Ex = new Expense({
        amount:req.body.amount,
        group:req.body.group,
        date:moment().format(),
        item:req.body.item
    })
    Ex.save()
    const promise = Expense.findOne({item:req.body.item})
    promise.then(function(result){
        console.log(`the amount of the expense is ${result.amount} and the item is ${result.item}`)
    })
    res.end()
})

router.put('/update',function(req,res){
     let oldGroup = req.body.group1
     let newGroup = req.body.group2
     Expense.findOne({group:oldGroup},function(err,data){
            data.group = newGroup
            data.save()
        })
   res.end()
})

router.get('/expenses/:group',function(req,res){
    Expense.find({group:req.params.group},function(err,expenses){
        res.send(expenses)
    })
})



module.exports = router