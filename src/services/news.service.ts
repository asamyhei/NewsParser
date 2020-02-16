import {Request, Response} from 'express';
import {News} from "../models/news.model";

let Parser = require('rss-parser');
let parser = new Parser();

export class NewsService {
    public welcomeMessage(req: Request, res: Response) {
        res.status(200).send('WELCOME_MESSAGE');
    }

    public getAllNews(req: Request, res: Response) {
        News.find({}, (error: Error, news: any) => {
            if (error) {
                res.send(error);
            }
            res.json(news);
        });
    }

    public getNewsById(req: Request, res: Response) {
        News.findById(req.params.id, (error: Error, news: any) => {
            if (error) {
                res.send(error);
            }
            res.json(news);
        });
    }

    public getNewsByCategory(req: Request, res: Response) {
        News.find({origin: req.params.origin}, (error: Error, news: any) => {
            if (error) {
                res.send(error);
            }
            res.json(news);
        });
    }

    getNewsByCategories(req: Request, res: Response) {
        const categories = req.body.categories;
        News.find({origin: {$in: categories}}, (error: Error, news: any) => {
            if (error) {
                res.send(error);
            }
            res.json(news);
        });
    }
}

export const parseFeed = async (url: string, origin: string) => {
    let feed = await parser.parseURL(url);
    feed.items.forEach((value: any) => {
        value.origin = origin;
        const newNews = new News(value);
        newNews.id = value.guid;
        newNews.save((error: Error, news: any) => {
            if (error) {
                console.log(error);
            }
        });
    });
};
