import dotenv from 'dotenv'

dotenv.config();

export enum Config {
    API_PORT = 'port',
    MYSQL_URI = 'mysql_url'
}

export type Environment = {
    [Config.API_PORT]: number;
    [Config.MYSQL_URI]: string;
};

export const env: Environment = {
    port: Number(process.env.API_PORT),
    mysql_url: process.env.MYSQL_URI
}

export default Config;
