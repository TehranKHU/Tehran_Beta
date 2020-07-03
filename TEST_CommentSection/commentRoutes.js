const express = require("express");
const commentController = require("./commentController");

const router = express.Router();

router.route("/").get(commentController.getAllComments);
router.route("/home").get(commentController.getQuery);
router.route("/insert").post(commentController.createComment);
router.route("/update").post(commentController.editComment);

module.exports = router;
