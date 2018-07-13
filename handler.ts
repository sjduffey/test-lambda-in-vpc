import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { createConnection, QueryError, RowDataPacket } from 'mysql';

export const hello: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {

    const db = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    };

    console.log('CREATE CONNECTION');

    const connection = createConnection(db);

    console.log('SEND QUERY');

    return await new Promise( ( resolve, reject ) => {
        connection.query( 'SELECT * FROM random_names', (err: QueryError, rows: RowDataPacket[]) => {
            if ( err ) {
                console.log('ERROR: ' + err.message);
                return reject( err );
            }

            const names = rows.map((value) => { return value['name']; });

            console.log('THE NAMES: ' + JSON.stringify(names));

            resolve( {
                statusCode: 200,
                body: JSON.stringify(names)
            } );
        } );
    } );
};
