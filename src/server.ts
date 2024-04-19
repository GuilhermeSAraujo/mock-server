import express from 'express';
import { IServer } from 'types';


export function createServer(configs: IServer[]) {
    const app = express();

    app.use(express.json());



    configs.forEach(config => {
        const method = config.httpRequest.method;
        switch (method) {
            case 'GET':
                app.get(config.httpRequest.path, (req, res) => {
                    res.status(config.httpResponse.statusCode);
                    res.set('Content-Type', config.httpResponse.headers.contentType[0]);
                    setTimeout(() => {
                        res.send(config.httpResponse.body);
                    }, config.httpResponse.delay.value);
                });
                break;
            case 'POST':
                app.post(config.httpRequest.path, (req, res) => {
                    res.status(config.httpResponse.statusCode);
                    res.set('Content-Type', config.httpResponse.headers.contentType[0]);
                    setTimeout(() => {
                        res.send(config.httpResponse.body);
                    }, config.httpResponse.delay.value);
                });
                break;
        }
    });

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}