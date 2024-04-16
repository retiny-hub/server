const Book = require('../models/book');
module.exports = {
    async addBook(req,res){
        res.set('Access-Control-Allow-Origin', '*');
        try {
            const{pub,title,description,overView,model,type,impactFactor,impactYear,
                submission,downloads,printISN,electronicISN,price} = req.body;

                if(!pub||!title||!description||!overView||!model||!type||!impactFactor||!impactYear||!submission||!downloads||!printISN||!electronicISN){
                    return res.status(403).json({err:'Please fill out all required fields.'})
                }else{
                    Book.create({
                        pub,title,description,overView,model,type,impactFactor,impactYear,
                submission,downloads,printISN,electronicISN,price
                    }).then(book=>{
                        if(book){
                            return res.status(200).json({resp:`${title} was added successfully.`})
                        }else{
                            return res.status(500).json({err:'Something went wrong. Try again.'})
                        }
                    }).catch(err=>res.status(500).json({err:err.message}))
                }
        } catch (error) {
            return res.status(500).json({err:error.message})
        }
    },
    async getBooks(req,res){
        res.set('Access-Control-Allow-Origin', '*');
        try {
            Book.find().then(books=>{
                if(books){
                    return res.status(200).json({resp:books})
                }else{
                    return res.status(404).json({err:'No book was found. Please add some.'})
                }
            })
        } catch (error) {
            return res.status(500).json({err:error.message})           
        }
    }
}