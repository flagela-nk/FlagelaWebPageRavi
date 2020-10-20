

const { Client } = require('pg')
// import { environment } from '../../environments/environment';
//const connectionString = process.env.POSTGRE_HOST ? ('postgresql://postgres:Password$1234@'+process.env.POSTGRE_HOST+':5432/FlagelaDev') : environment.postgre_url
const connectionString =  ('postgresql://postgres:Password$1234@'+process.env.POSTGRE_HOST+':5432/FlagelaDev') 
import { ObjectID } from 'mongodb';

// console.log('connecting to postgre');
var email = 'john.smith@example.com';

/*
(async() => {
    
    var client = new Client({
        connectionString: connectionString,
    })
    await client.connect()
    var users = await client.query(`SELECT * FROM users WHERE email=$1::text`, [email]);
    console.log(users.rows)
    await client.end()
})();
*/

export default class PostgreClient {

    public client: any = null;

    constructor(){
        this.client = new Client({
            connectionString: connectionString,
        })
    }

    private get$string(length:number){
        var sub = []
        for (var i = 1; i <= length; i++)
            sub.push('$' + i)
        return sub.join(',');
    }

    async connect(){
        await this.client.connect()
    }

    async executeQuery<T>(queryString:string): Promise<T[]> {
        let result = await this.client.query(queryString);
        return result.rows.length > 0 ? result.rows : [];
    }

    async executeScript(script:string){
        let result = await this.client.query(script);
        return result.rows.length > 0 ? result.rows[0] : [];
    }

    async getRecords(tableName: string, query: any) {

        var keys = Object.keys(query)

        var queryString = `
        SELECT * 
        FROM ${tableName} 
        WHERE `;
        for(var i=1; i <= keys.length; i++){
            if(i >1)queryString += ' AND '
            queryString += keys[i-1] + '=$' + i ;
        }

        let result = await this.client.query(queryString, Object.values(query));
        return result.rows;

    }

    async getFirstRecord(tableName: string, query: any) {

        var keys = Object.keys(query)

        var queryString = `
        SELECT * 
        FROM ${tableName} 
        WHERE `;
        for(var i=1; i <= keys.length; i++){
            if(i >1)queryString += ' AND '
            queryString += keys[i-1] + '=$' + i ;
        }
        queryString += ' LIMIT 1';

        let result = await this.client.query(queryString, Object.values(query));
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    async getRecordById(tableName: string, id: string) {

        let result = await this.client.query(`
        SELECT * 
        FROM ${tableName} 
        WHERE id = $1::text`, [id]);

        return result.rows[0];
    }

    async createRecord(tableName: string, data: any) {
       delete data['id'];
        var keys = Object.keys(data);
        var insert_user_query = {
            text: `
            INSERT INTO ${tableName} (` + keys + `) 
            VALUES (`+ this.get$string(keys.length) + `) 
            RETURNING *
            `,
            values: Object.values(data),
        }

        var create_user_response = await this.client.query(insert_user_query)
        // console.log('created', create_user_response);

        return create_user_response.rows[0];
    }

    async updateRecordById(tableName: string, data: any, id?:string) {
        if(!id && data['id']) id = data['id']
        else if(!id && !data['id']) throw 'Id is required to update';
        delete data['id'];
        
        var keys = Object.keys(data);
        var values = Object.values(data);

        var updateQueryString = `
        UPDATE ${tableName} 
        SET `;
        for(var i=1; i <= keys.length; i++){
            if(i >1) updateQueryString += ', '
            updateQueryString += keys[i-1] + '=$' + i ;
        }
        updateQueryString += ' WHERE id=$'+(keys.length+1)+'::uuid';
        values.push(id);
        updateQueryString += ' RETURNING *';

        console.log('Executing Update Command', updateQueryString, values)
        var insert_user_query = {
            text: updateQueryString,            
            values: values,
        }

        var update_user_response = await this.client.query(insert_user_query)
        console.log('updated', update_user_response.rows[0]);

        return update_user_response.rows.length > 0 ? update_user_response.rows[0] : null;
    }

    async deleteRecordById(tableName: string, id:string) {
        let result = await this.client.query(`
        DELETE FROM ${tableName} 
        WHERE id = $1::text`, [id]);
    }

}