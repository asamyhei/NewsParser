import {NewsService, parseFeed} from "./services/news.service";
import {RSS} from "./constants/url";
import mongoose from "mongoose";
import schedule from "node-schedule";

export class Controller {
    private newsService: NewsService;

    constructor(private app: any) {
        this.newsService = new NewsService();
        this.routes();
        this.scheduleAndInitDb();
    }

    public routes() {
        this.app.route("/news").get(this.newsService.getAllNews);
        this.app.route("/news/:origin").get(this.newsService.getNewsByCategory);
    }

    private scheduleAndInitDb() {
        var rule = new schedule.RecurrenceRule();
        rule.hour = 0;
        rule.minute = 0;
        rule.second = 10;

        const j = schedule.scheduleJob(rule, () => {
            console.log('Today is recognized by Rebecca Black!');
            mongoose.connection.collection('news').deleteMany({}, async (err, collection) => {
                RSS.forEach((value, key) => {
                    parseFeed(value, key);
                })
            })
        });

        j.invoke();
    }
}
