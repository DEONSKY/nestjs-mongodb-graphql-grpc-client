import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { userProviders } from './user/user.providers';
import { databaseProviders } from './database/database.providers';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql',
  }), UserModule,DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    UserResolver,
    ...databaseProviders,
    ...userProviders,],
})
export class AppModule {}
