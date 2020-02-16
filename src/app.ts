import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {Controller} from "./main.controller";
import mongoose from "mongoose";
import {MONGO_URL} from "./constants/news.constant";

class App {
    public app: any;
    public newsController: Controller;

    constructor() {
        this.app = express();
        this.setConfig();
        this.setMongoConfig();
        this.newsController = new Controller(this.app);
    }

    private setConfig() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cors());
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true
        });
    }
}

export default new App().app;
