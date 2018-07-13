import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { createConnection, QueryError, RowDataPacket } from 'mysql';

export const hello: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {

    //cb(null, { statusCode: 200, body: 'All good' });

    const db = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    };

    console.log('CREATE CONNECTION');

    const connection = createConnection(db);

    console.log('SEND QUERY');

    const response = await new Promise( ( resolve, reject ) => {
        connection.query( 'SELECT * FROM random_names', (err: QueryError, rows: RowDataPacket[]) => {
            if ( err ) {
                console.log('ERROR: ' + err.message);
                connection.destroy();
                reject( err );

                return;
            }

            const names = rows.map((value) => { return value['name']; });
            connection.destroy();

            console.log('THE NAMES: ' + JSON.stringify(names));

            resolve( names );
        } );
    } );

    console.log('EXECUTE CALLBACK WITH ' + JSON.stringify(response));

    cb(null, {
        statusCode: 200,
        body: JSON.stringify(response)
    });
};
