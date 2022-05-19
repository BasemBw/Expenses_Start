const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Expense = require('./model/Expense')
const api = require('./server/routes/api')
const Expensedata = require('./expenses-data/expenses.json')
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'node_modules')))

mongoose.connect("mongodb://localhost/mongoose")

/* for(let expense of Expensedata){
    let Ex = new Expense({
        amount:expense.amount,
        group:expense.group,
        date:expense.date,
        item:expense.item
    })
    Ex.save()
} */

app.use('/',api)

const port = 6060
app.listen(port,function(){})






