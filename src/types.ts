export interface IServer {
    httpRequest: {
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        path: string;
        body: {
            type: string;
            json: {
                [key: string]: any;
            };
        };
    };
    httpResponse: {
        statusCode: number;
        headers: {
            contentType: string[];
        },
        delay: {
            value: number;
        },
        body: any;
    }
}