//import
const {register,login,getBalance,moneyTransfer,passBook,deleteUser} = require ('../controllers/logic')
//import middlwware
const { middleWare } = require('../middlewares/middlewares')
const express = require('express')


//router object
const router = new express.Router()

// create ac - signup
router.post('/bankuser/create_acc',register)

// login
router.post('/bankuser/login',login)

// balance check
router.get('/bankuser/balance/:acno',middleWare,getBalance)
// money transfer
router.post('/moneytransfer',middleWare,moneyTransfer)
// account statement
router.get('/bankuser/passbook/:acno',middleWare,passBook)
// delete account
router.delete('/bankuser/delete/:acno',middleWare,deleteUser)
// export
 module.exports=router