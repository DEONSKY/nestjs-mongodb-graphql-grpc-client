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
import { GrpcTestService } from './grpc-test/grpc-test.service';
import { FeatureResolver, RouteNoteResolver, RouteSummaryResolver } from './grpc-test/grpc-test.resolver';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { MONO_DB_CONNECTION_STRING } from './constants';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(MONO_DB_CONNECTION_STRING),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql',
  }), UserModule,DatabaseModule,AuthorModule,BookModule],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    UserResolver,
    BookModule,
    AuthorModule,
    GrpcTestService,
    FeatureResolver,
    RouteSummaryResolver,
    RouteNoteResolver,
    ...databaseProviders,
    ...userProviders,],
})
export class AppModule {}
