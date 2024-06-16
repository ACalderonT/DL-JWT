import express from 'express';
import cors from "cors";
import softJobsRoute from "./routes/softjobs.route.js"
import 'dotenv/config';
import { HandleDatabaseLogs } from './lib/logs/logsMiddleware.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use("/", HandleDatabaseLogs, softJobsRoute)

app.listen(process.env.PORT, console.log(`Listening on http://localhost:${process.env.PORT}`));