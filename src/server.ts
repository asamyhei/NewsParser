import app from "./app";
import {PORT} from "./constants/news.constant";

app.listen(process.env.PORT || PORT, () => {
  console.log("Listening on port " + process.env.PORT || PORT);
});
