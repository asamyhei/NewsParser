import { NewsService } from "./services/news.service";
import {News} from "./models/news.model";

export class Controller {
  private newsService: NewsService;

  constructor(private app: any) {
    this.newsService = new NewsService();
    this.routes();
  }

  public routes() {
    this.app.route("/").get(this.newsService.welcomeMessage);
    this.app.route("/news").get(this.newsService.getAllNews);
    this.app.route("/news/:id").get(this.newsService.getNewsById);
    this.app.route("/news").post(this.newsService.addNews);
    this.app.route("/news").delete(this.newsService.deleteNews);
  }
}
