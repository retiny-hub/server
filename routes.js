const express = require('express')
const userRoute = express.Router()
const {register, login, getUser,getUsers,editUser,getAdmin,getAdmins,editAdmin, createAccount,
     accountActivation, deleteAccount, passwordReset, checkUserName, checkEmail, newPassword, myCommissions,
     createBankAccount, updateProfilePicture, lastVisited, getReferrers} = require('./controllers/userController')
const {userAuth} = require('./middleware/userAuth')
const appAdmin = require('./middleware/appAdmin')
const { addAboutApp, editAboutApp } = require('./controllers/aboutAppController')
// const { newContact, contacts, contactResponse } = require('./controllers/contactController')
// const { newFeedback, feedbackFixing, feedbacks } = require('./controllers/feedbackController')
const { getSupports, newSupport, supportComment, updateSupport } = require('./controllers/supportController');
const { createAppSetting, deleteAppUsers, getAppSetting, newsletterSubscription, newNewsletterToSubscribers, updateApp, joinStaffs } = require('./controllers/AppController');
const { createManuscript, approveManuscript, disapproveManuscript, deleteManuscript, getManuscripts, publishManuscript, unpublishManuscript, manuscriptPayment } = require('./controllers/manuscriptController')
const { getBooks, addBook } = require('./controllers/bookController')

//USER ROUTES
userRoute.post('/check-username',checkUserName)
userRoute.post('/update-profile-picture',userAuth,updateProfilePicture);
userRoute.post('/check-email',checkEmail)
userRoute.post('/register',register)
userRoute.post('/login',login)
userRoute.post('/editorial-login',login)
userRoute.get('/profile',userAuth,getUser)
userRoute.put('/create-bank-account',userAuth, createBankAccount)
userRoute.get('/users',getUsers)
userRoute.put('/update-user-detail',userAuth, editUser)
userRoute.put('/account-activation', accountActivation)
userRoute.post('/create-account', createAccount)
userRoute.post('/password-reset', passwordReset)
userRoute.put('/create-new-password', newPassword)
userRoute.put('/last-visited',userAuth,lastVisited)

//Referrers
userRoute.get('/referrers', getReferrers)
//Contacts
// userRoute.post('/new-contact',newContact)
// userRoute.put('/:contactId/reply-contact',appAdmin,contactResponse)
// userRoute.get('/contacts',appAdmin,contacts)

//Feedback
// userRoute.post('/new-feedback', newFeedback)
// userRoute.put('/:feedbackId/fix-feedback',appAdmin,feedbackFixing)
// userRoute.get('/feedbacks',appAdmin,feedbacks)

//Support
userRoute.get('/supports',getSupports)
userRoute.post('/new-support',userAuth,newSupport)
userRoute.put('/comment-support/:supportId',supportComment)
userRoute.put('/update-support/:supportId',userAuth,updateSupport)

//App Admin
userRoute.get('/admin/profile',appAdmin,getUser)
userRoute.get('/admins', appAdmin,getAdmins)
userRoute.get('/admin', appAdmin,getAdmin)
userRoute.patch('/:adminId/edit-profile',appAdmin,editAdmin)
userRoute.post('/add-about-app',(appAdmin),addAboutApp)
userRoute.put('/edit-about-app',(appAdmin),editAboutApp)
userRoute.put('/edit-about-app',(appAdmin),editAboutApp)

//App
userRoute.post('/create-app-setting',userAuth,createAppSetting)
userRoute.delete('/delete-app-users',userAuth,deleteAppUsers)
userRoute.get('/app-setting',getAppSetting)
userRoute.post('/update-app',userAuth,updateApp)
userRoute.put('/delete-account', userAuth, deleteAccount)
userRoute.post('/newsletter-subsrciption',newsletterSubscription)
userRoute.post('/newsletter',userAuth,newNewsletterToSubscribers)

//Payments
userRoute.post('/make-payment',userAuth,manuscriptPayment)

//Manuscripts
userRoute.post('/create-manuscript',userAuth,createManuscript)
userRoute.put('/approve-manuscript/:manuId',userAuth,approveManuscript)
userRoute.put('/disapprove-manuscript/:manuId',userAuth,disapproveManuscript)
userRoute.put('/publish-manuscript/:manuId',userAuth,publishManuscript)
userRoute.put('/unpublish-manuscript/:manuId',userAuth,unpublishManuscript)
userRoute.put('/publication-payment/:manuId',userAuth,unpublishManuscript)
userRoute.delete('/delete-manuscript/:manuId',userAuth,deleteManuscript)
userRoute.get('/manuscripts',getManuscripts)
userRoute.post('/add-book', userAuth,addBook)
userRoute.get('/books',getBooks)

module.exports = userRoute