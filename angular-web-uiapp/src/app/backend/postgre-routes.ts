import PostgreClient from './postgre-client';

import express, { query } from 'express';
export var routes = express.Router();

function get$string(length: number) {
    var sub = []
    for (var i = 1; i <= length; i++)
        sub.push('$' + i)
    return sub.join(',');
}

routes.post('/query', async (req: any, res: any) => {

    // console.log('Postgre-query-request:', req.body);
    if (req.body) {

        var result = null;
        try {
            var postgreClient = new PostgreClient()
            await postgreClient.connect();

            result = await postgreClient.client.query(req.body);

            await postgreClient.client.end();
        } catch (error) {
            console.error('Postgre-query-error:', error);
            return res.status(500).json('postgre error:' + error.toString());
        }
        // console.log('Postgre-query-response:', result.rows);
        return res.json(result.rows);
    } else return res.status(403).json("query is not present in request body");
});

routes.post('/insert/:tableName', async (req: any, res: any) => {

    console.log('Postgre-insert-request:', req.params.tableName, req.body);
    if (req.body && req.params.tableName) {

        var data = req.body;

        delete data['id'];
        var keys = Object.keys(data);
        var insert_query = {
            text: `
            INSERT INTO ${req.params.tableName} (` + keys + `) 
            VALUES (`+ get$string(keys.length) + `) 
            RETURNING *
            `,
            values: Object.values(data),
        };

        console.log('Postgre-insert-request-script:', insert_query);
        var result = null;
        try {
            var postgreClient = new PostgreClient()
            await postgreClient.connect();

            result = await postgreClient.client.query(insert_query);

            await postgreClient.client.end();
        } catch (error) {
            console.error('Postgre-insert-error:', error);
            return res.status(500).json('postgre error:' + error.toString());
        }
        console.log('Postgre-insert-response:', result.rows);
        return res.json(result.rows);
    } else return res.status(403).json("insert body/tablename is not present in request body");
});

routes.post('/update/:tableName/:id?', async (req: any, res: any) => {
    
    console.log('Postgre-update-request:', req.params.tableName, req.params.id, req.body);


    if (req.body && req.params.tableName && (req.params.id || req.body['id'])) {

        var data = req.body;
        var id = req.body['id'] || req.params.id;

        delete data['id'];

        var keys = Object.keys(data);
        var values = Object.values(data);

        var updateQueryString = `
        UPDATE ${req.params.tableName} 
        SET `;
        for (var i = 1; i <= keys.length; i++) {
            if (i > 1) updateQueryString += ', '
            updateQueryString += keys[i - 1] + '=$' + i;
        }
        updateQueryString += ' WHERE id=$' + (keys.length + 1) + '::uuid';
        values.push(id);
        updateQueryString += ' RETURNING *';

        var update_query = {
            text: updateQueryString,
            values: values,
        }

        console.log('Postgre-update-request-script:', update_query);
        var result = null;
        try {

            var postgreClient = new PostgreClient();
            await postgreClient.connect();

            result = await postgreClient.client.query(update_query);

            await postgreClient.client.end();
        } catch (error) {
            console.error('Postgre-update-error:', error);
            return res.status(500).json('postgre error:' + error.toString());
        }

        console.log('Postgre-update-response:', result.rows);
        return res.json(result.rows);
    } else return res.status(403).json("update body/tablename/id is not present in request body");
});

