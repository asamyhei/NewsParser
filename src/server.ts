import app from "./app";
import {PORT} from "./constants/news.constant";

app.listen(process.env.PORT || PORT, () => {
  console.log(process.env.PORT)
  console.log("Listening on port " + PORT);
});
