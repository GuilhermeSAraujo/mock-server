import express, { Express } from 'express';
import { IServer } from 'types';


export function createServer(configs: IServer[]) {
    const app = express();

    app.use(express.json());



    configs.forEach(config => {
        const method = config.httpRequest.method;
        switch (method) {
            case 'GET':
                getEndpoint(app, config);
                break;
            case 'POST':
                postEndpoint(app, config);
                break;
        }
    });

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

function getEndpoint(app: Express, config: IServer) {
    app.get(config.httpRequest.path, (_, res) => {
        res.status(config.httpResponse.statusCode);
        res.set('Content-Type', config.httpResponse.headers.contentType[0]);

        setTimeout(() => {
            res.send(config.httpResponse.body);
        }, config.httpResponse.delay.value);
    });
}

function postEndpoint(app: Express, config: IServer) {
    app.post(config.httpRequest.path, (req, res) => {
        for (const [key, value] of Object.entries(req.body)) {
            if (!config.httpRequest.body.keys.includes(key)) {
                res.status(400);
                res.send('Bad Request');
                return;
            }
        }

        res.status(config.httpResponse.statusCode);
        res.set('Content-Type', config.httpResponse.headers.contentType[0]);

        setTimeout(() => {
            res.send(config.httpResponse.body);
        }, config.httpResponse.delay.value);
    });
}