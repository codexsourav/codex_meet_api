import express from 'express';
import routs from './routes/route.js';
import meetRoutes from './routes/meetRoutes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import env from "dotenv";
env.config()

const app = express();
app.use(
    express.static("static"),
    cors(),
    express.json(),
    cookieParser(),
    routs,
    meetRoutes,
);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening at ${process.env.HOST_URI}`);
});
