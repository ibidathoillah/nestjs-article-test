import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const postgresTypeorm: TypeOrmModuleOptions = {
    name: 'postgres',
    type: 'postgres', 
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'nest',
    entities: [ __dirname + '/../**/**/*.entity{.js,.ts}' ],
    synchronize: true
}