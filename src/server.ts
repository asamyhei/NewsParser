import app from "./app";
import {PORT} from "./constants/news.constant";

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
