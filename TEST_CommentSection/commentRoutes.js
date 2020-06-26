const express = require("express");
const commentController = require("./commentController");

const router = express.Router();

router.route("/").get(commentController.getAllComments);
router.route("/home").get(commentController.getQuery);

module.exports = router;
