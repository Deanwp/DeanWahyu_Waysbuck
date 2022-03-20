const express = require('express')

const router = express.Router()

// Controller
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { getBeverages, addBeverage, getBeverage, updateBeverage, deleteBeverage } = require('../controllers/beverage')
const { getToppings, addTopping, getTopping, updateTopping, deleteTopping } = require('../controllers/topping')
const { getTransactions, addTransaction } = require('../controllers/transaction')
const { register, login, checkAuth } = require('../controllers/auth')
const { addOrder, getOrder, deleteOrder } = require('../controllers/order') 
const { getProfile } = require("../controllers/profile");

// Middleware
const { auth } = require('../middlewares/auth')
const {uploadFile} = require('../middlewares/uploadFile')

// Route
router.post('/register', register)
router.post('/login', login)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.get("/check-auth", auth, checkAuth);

router.get('/beverages', getBeverages)
router.post('/beverage', auth, uploadFile("image"), addBeverage)
router.get('/beverage/:id', getBeverage)
router.patch('/beverage/:id', auth, uploadFile("image"), updateBeverage)
router.delete('/beverage/:id', auth, deleteBeverage)

router.get('/toppings', getToppings)
router.post('/topping', auth, uploadFile("image"), addTopping)
router.get('/topping/:id', getTopping)
router.patch('/topping/:id', auth, uploadFile("image"), updateTopping)
router.delete('/topping/:id', auth, deleteTopping)

router.get('/orders', getOrder)
router.post('/order', auth, addOrder)
router.delete('/order/:id', auth, deleteOrder)

router.get('/transactions', getTransactions)
router.post('/transaction', auth, addTransaction)

router.get("/profile", auth, getProfile);


module.exports = router