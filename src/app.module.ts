import {Module} from "@nestjs/common"
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import * as process from "node:process";

if(!process.env.NODE_ENV){
    process.env.NODE_ENV = 'production'
}

@Module( {
  controllers: [],
  providers: [],
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}.local`,
      }),
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          entities: [],
          autoLoadEntities: true,
      }),
      UsersModule
  ]
})
export class AppModule {}