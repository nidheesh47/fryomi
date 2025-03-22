const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { addAddress, getAddresses, getAddressById, updateAddress, deleteAddress } = require("../controllers/addressController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router  = express.Router();

router.post('/add',authMiddleware,roleMiddleware(['user']),addAddress);
router.get('/addresses',getAddresses)
router.get('/:addressId',getAddressById);
router.put('/updateAddress/:addressId',updateAddress);
router.delete('/deleteAddress/:addressId',deleteAddress);

module.exports = router;