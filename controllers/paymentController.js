// const Payment = require('../models/payment');
// const Book = require('../models/book');

// module.exports = {
//     async makePayment(req,res){
//         const{status,amount,item} = req.body;
//         const journal = await Book.find({pub:item.pub});

//         try {
//             if(status==='paid'&&parseInt(amount)>=parseInt(journal.price)){
//                 Payment.create({
//                     amount,payer:req.user._id,item
//                 }).then(payment=>{
//                     if(payment){
//                         return res.status(200).json({resp:`Payment of ${parseInt(journal.price)} was confirmed.`})
//                     }else{
//                         return res.status(500).json({err:'Something went wrong. Please contact support'})
//                     }
//                 })
//             }else if(status!=='paid'&&parseInt(amount)>=parseInt(parseInt(journal.price))){
//                 return res.status(500).json({err:`Payment not confirmed. Kindly contact support, to proceed.`})
//             }else if(status==='paid'&&parseInt(amount)<parseInt(parseInt(journal.price))){
//                 return res.status(500).json({err:`Minimum is ${parseInt(parseInt(journal.price))}. Pay more ${parseInt(amount)-parseInt(parseInt(journal.price))}, to proceed.`})
//             }
//         } catch (error) {
//             return res.status(500).json({err:error.message})
//         }
//     }
// }