const express = require("express");
const router = express.Router();

const postController = require("../controllers/posts");
const { auth } = require('../controllers/auth');

router.get("/", postController.getPosts);

router.post("/new-post", auth,postController.createPost);

router.get("/:id", postController.getPostById);

router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

router.post("/:id/like", auth, postController.addlike);

router.get("/:id/likes", auth, postController.getLikes);

router.post("/:id/comment", auth, postController.addcomment);

router.get("/:id/comments", auth, postController.getComments);


module.exports = router;
