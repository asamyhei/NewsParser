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
        const categories = req.body.categories;
        News.find({origin: {$in: categories}}, (error: Error, news: any) => {
            if (error) {
                res.send(error);
            }
            res.json(news);
        });
    }

    public addNews(req: Request, res: Response) {
        const newNews = new News(req.body);
        newNews.save((error: Error, news: any) => {
            if (error) {
                res.send(error);
            }
            res.json(news);
        });
    }

    public deleteNews(req: Request, res: Response) {
        const newsID = req.params.id;
        News.findByIdAndDelete(newsID, (error: Error, deleted: any) => {
            if (error) {
                res.send(error);
            }
            res.status(200).send(deleted);
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
