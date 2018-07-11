import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { createConnection, QueryError, RowDataPacket } from 'mysql';

export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {

    const db = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    };

    const connection = createConnection(db);

    connection.query('SELECT * FROM random_names', (err: QueryError, rows: RowDataPacket[]) => {

        const names = [ rows[0]['name'], rows[1]['name'], rows[2]['name'] ];

        // const response = {
        //     statusCode: 200,
        //     body: JSON.stringify(names),
        // };

        cb(null, JSON.stringify(names));
    });
};
