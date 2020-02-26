const express = require( "express" );
const multer = require( "multer" );
const postControllers = require("./controllers/PostController");
const likeControllers = require("./controllers/LikeController");
const uploadConfigs = require("./config/upload");

const routes = new express.Router();
const upload = multer( uploadConfigs );

// POSTS
routes.get( "/posts",  postControllers.index );
routes.post( "/posts", upload.single('image'), postControllers.store );

// LIKES 
routes.post("/posts/:id/like" , likeControllers.like);

routes.get("/" , ( req, res ) => {
    res.send( "API - Versao 1.0.0" );
});

module.exports = routes;