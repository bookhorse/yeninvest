import express from "express";
import bodyParser from "body-parser";
import path from "path";
import routes from "./routes.js";

const app = express();
const PORT = 3000;
const reactRoot = path.join(process.cwd(), "public", "index.html");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

routes.setup(app);
app.get("*", (req, res) => res.sendFile(reactRoot));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
