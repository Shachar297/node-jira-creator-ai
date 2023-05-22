import express, {Application} from 'express';
import cors from 'cors';
import RoutesManager from './routes/routes-manager';

require("dotenv").config();

export default class Server{
    private app: Application;
    private port: number;

    public constructor(){

        this.app = express();
        this.app.use(express.json())
        this.port = parseInt(process.env.PORT || "3005") || 3005;
        const routesManager = new RoutesManager();
        this.app.use(routesManager.router);
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server started and listening on ${this.port}`);
        });
    }
}

const
    server = new Server();
    server.start();