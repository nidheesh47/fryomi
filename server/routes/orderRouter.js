const express = require('express');
const { createOrder, getAllOrders, getOrderById, getAllRestaurantOrders, updateOrderUser, updateOrderStatus } = require('../controllers/orderController');
const { createPayment, verifyPayment, getPayments } = require('../controllers/paymentController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/create-order',roleMiddleware(['user']),createOrder);
router.get('/get-all-order',roleMiddleware(['user']),getAllOrders);
router.get('/get-order-by-id/:orderId',getOrderById);
router.put('/update-Order/:orderId',roleMiddleware(['user']),updateOrderUser);
router.patch('/update-order-status/:orderId',updateOrderStatus);
router.get('/get-all-restaurant-orders/:restaurantId',getAllRestaurantOrders);

router.post('/:orderId/payment',createPayment);
router.post('/verify-payment',verifyPayment);
router.get('/get-all-payments',getPayments);

module.exports = router;