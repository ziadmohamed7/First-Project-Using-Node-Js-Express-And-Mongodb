
const express = require("express");
const {getContacts,getContactUsingId,createContacts,deleteContact,updateContact}= require("../controllers/contactController");
const validateToken = require("../midellware/validateUserToken");
const router = express.Router(getContacts);


router.use(validateToken);
router.route('/').get(getContacts).post(createContacts);

router.route('/:id').get(getContactUsingId).put(updateContact).delete(deleteContact);


module.exports = router;

