const express = require('express');
const { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant } = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { createMenuItem, updateMenuItem, deleteMenuItem, getMenuItemsByName, getMenuItemByIdInRestaurant, getMenuItemsByRestaurant, } = require('../controllers/menuController');
const { upload } = require('../middlewares/multer');

const router = express.Router();


router.post('/', authMiddleware,roleMiddleware(['admin', 'restaurant manager']),upload.single('image'), createRestaurant);
router.get('/', getRestaurants);
router.get('/:restaurantId', getRestaurantById);
router.patch('/:restaurantId', authMiddleware, roleMiddleware(['restaurant manager','admin']),upload.single('image'), updateRestaurant);
router.delete('/:restaurantId', authMiddleware,roleMiddleware(['admin']),deleteRestaurant);
router.post('/:restaurantId',authMiddleware,roleMiddleware(['admin', 'restaurant manager']),upload.single('image'),createMenuItem);
router.get('/menu/:name',getMenuItemsByName);
router.get('/:restaurantId/:menuItemId/menu',getMenuItemByIdInRestaurant);
router.get('/:restaurantId/menu',getMenuItemsByRestaurant);
router.put('/:restaurantId/:menuItemId/updateMenu',authMiddleware, roleMiddleware(["admin","restaurant manager"]),upload.single("image"), updateMenuItem);
router.delete('/:restaurantId/:menuItemId/deleteMenu',authMiddleware, roleMiddleware(['admin','restaurant manager']),deleteMenuItem)





module.exports = router;