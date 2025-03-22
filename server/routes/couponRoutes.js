const express = require('express');

const roleMiddleware = require('../middlewares/roleMiddleware');
const { createCoupon, updateCoupon, deleteCoupon, getCoupons, applyCoupon } = require('../controllers/couponController');

const router = express.Router();

router.post('/create-coupon',roleMiddleware(['admin']),createCoupon);
router.post('/apply-coupon',roleMiddleware(['user']),applyCoupon);
router.post('/update-coupon/:id',roleMiddleware(['admin']),updateCoupon);
router.delete('/delete-coupon/:id',roleMiddleware(['admin']),deleteCoupon);
router.get('/get-coupon',getCoupons);
module.exports = router;
