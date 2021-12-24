const express = require("express");
const router = express.Router();
const { Posts } = require ("../models");

// router.get("/:id", async (req, res)=>{
//        const userId = req.params.id;
//        const usernameId = await Pieces.findAll({where: {userId: userId}});
//        res.json(usernameId);
// })
router.get("/", async(req, res)=>{
       const allPosts = await Posts.findAll();
       res.json(allPosts)
})

router.post("/", async (req, res)=>{
       const posts = req.body;
       await Posts.create(posts);
       res.json(posts);
})

module.exports = router;