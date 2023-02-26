import express from "express";

let router = express.Router();

let initAPIRoutes = (app) => {
    
    return app.use('/api', router);
};

module.exports = initAPIRoutes;