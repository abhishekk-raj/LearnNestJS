import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: true
}
console.log(process.env.DATABASE_HOST);
console.log(process.env.DATABASE_PORT);
console.log(process.env.DATABASE_PASSWORD);

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;