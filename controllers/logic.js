//import users
const users = require('../model/collection')
//import json webtoken
const jwt= require('jsonwebtoken')
//register-account creation
register = (req, res) => {
    //destrucrting
    const { acno, psw, uname } = req.body
    // check user in data collection
    users.findOne({ acno }).then(user => {
        if (user) {
            //.json method will convert js to json and also send
            res.status(400).json({
                message: "user already exist",
                status: false,
                statusCode: 400
            }
            )
        } else {
            // if not found create object for user
            let newUser = new users({
                acno, uname, psw, balance: 0, transactions: []
            })
            //to save in database
            newUser.save()
            res.status(201).json({
                message: "Account Created Succesfully",
                status: true,
                statusCode: 201
            }
            )
        }
    })
}
login = (req, res) => {
    //access data
    const { acno, psw } = req.body
    users.findOne({ acno, psw }).then(user => {
        if (user) {
            //token generation
            const token =jwt.sign({acno},"spidey")
            //.json method will convert js to json and also send
            res.status(200).json({
                message: "Login succesfully",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                token
            })
        } else {
            res.status(404).json({
                message: "Incorrect account number / password",
                status: false,
                statusCode: 404
            })
        }
    })
}
getBalance = (req, res) => {
    //req acno from params
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.balance,
                status: true,
                statusCode: 200
            })
        } else {
            res.status(404).json({
                message: "User not exist",
                status: false,
                statusCode: 404
            })
        }
    })

}

moneyTransfer = (req, res) => {
    const { sAcno, rAcno, amount, psw, date} = req.body
    //convert to number
    const amnt = Number(amount);
    users.findOne({ acno: sAcno, psw }).then(sender => {
        if (sender) {
            //check reciver details
            users.findOne({ acno: rAcno }).then(recevier => {
                if (recevier) {
                    if (amnt <= sender.balance) {

                        //sender data updated
                        sender.balance = sender.balance - amnt
                        sender.transactions.push({ tAcno: rAcno, amount: amnt, type: "DEBIT",date })
                        sender.save()
                        //recevier data updated
                        recevier.balance = recevier.balance + amnt
                        recevier.transactions.push({ tAcno: sAcno, amount: amnt, type: "CREDIT",date})
                        recevier.save()

                        //front end response send

                        res.status(200).json({
                            message: "Transaction Successfull",
                            status: true,
                            statusCode: 200
                        })
                    } else {
                        res.status(406).json({
                            message: "Insufficient Balance",
                            status: false,
                            statusCode: 406
                        })
                    }

                } else {
                    res.status(404).json({
                        message: "Invalid debit credentials",
                        status: false,
                        statusCode: 404
                    })
                }
            })

        } else {
            res.status(404).json({
                message: "Recipient account number not found",
                status: false,
                statusCode: 404
            })
        }
    })
}
passBook = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.transactions,
                status: true,
                statusCode: 200
            })
        } else {
            res.status(404).json({
                message: "user not present",
                status: false,
                statusCode: 404
            })
        }
    })
}
deleteUser=(req,res)=>{
    const {acno} = req.params
    users.deleteOne({acno}).then(data=>{
        if(data){
            res.status(200).json({
                message:"Deleted",
                status:true,
                statusCode:200
            })
        }
    })
}
// to export morethan one
module.exports = { register, login, getBalance, moneyTransfer, passBook,deleteUser }
