/* function required(value){
	if(value === undefined){
		throw new Error();
	}

	return value;
} */

export const DB_HOST = process.env.APP_DB_HOST;
export const DB_USER = process.env.APP_DB_USER;
export const DB_NAME = process.env.APP_DB_NAME;
export const DB_PASS = process.env.APP_DB_PASS;
export const DB_DIALECT = 'mariadb';