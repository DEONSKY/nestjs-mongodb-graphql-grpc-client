
// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GrpcTestService } from './grpc-test.service';
import { FeatureResolver, RouteNoteResolver, RouteSummaryResolver } from './grpc-test.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [    GrpcTestService,
    FeatureResolver,
    RouteSummaryResolver,
    RouteNoteResolver,],
})
export class GrpcTestModule {}