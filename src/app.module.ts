import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule.forRoot({
                    // without explicitly stating the .env file, the config module does not seem to find it
                    envFilePath: '.env',
                }),
            ],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                console.log(configService.get('DB_HOST'));
                return {
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    synchronize: true, // for the time being, change to false and add migrations later
                    entities: ['dist/todo/entities/**.entity{.ts,.js}'],
                };
            },
        }),
        TodoModule,
    ],
})
export class AppModule {}
