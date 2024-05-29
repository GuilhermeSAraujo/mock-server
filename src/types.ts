export interface IServer {
    httpRequest: {
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        path: string;
        body: {
            keys: string[]
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