import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import path from 'path';
import {apiRouter} from "./routers/api-router.mjs";
import {checkConnectionMongoDB} from "./db/mongo.mjs";
import {STATUS_SUCCESS} from "./utils/const.mjs";

const app = express();
const port = parseInt(process.env.SERVER_PORT ?? "3001");
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

app.get('/health-check', (req, res) => {
  res.status(STATUS_SUCCESS).json({'Health check': 'status ok'});
});

checkConnectionMongoDB().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
