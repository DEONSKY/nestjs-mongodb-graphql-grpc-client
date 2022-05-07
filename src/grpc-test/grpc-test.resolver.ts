import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GrpcTestService } from './grpc-test.service';
import { Point, Feature,Rectangle,RouteNote, RouteSummary } from './grpc-test.scheme';
import { PointInput, RectangleInput, RouteNoteInput } from './grpc-test.input';

@Resolver(() => Feature)
export class FeatureResolver {
  constructor(private grpcTestService: GrpcTestService) {}

  @Query(() => Feature)
  async getFeature(@Args('input') pointInput: PointInput) {
    return this.grpcTestService.getFeature(pointInput);
  }

  @Query(() => [Feature])
  async getFeatures(@Args('input') rectangle: RectangleInput) {
    return this.grpcTestService.getFeaturess(rectangle);
  }
}

@Resolver(() => RouteSummary)
export class RouteSummaryResolver {
  constructor(private grpcTestService: GrpcTestService) {}

  @Query(() => RouteSummary)
  async recordRoute(@Args({name:'input', type: () => [PointInput]}) points: [PointInput]) {
    return this.grpcTestService.recordRoutee(points);
  }
  
}

@Resolver(() => RouteNote)
export class RouteNoteResolver {
  constructor(private grpcTestService: GrpcTestService) {}

  @Query(() => [RouteNote])
  async routeChat(@Args({name:'input', type: () => [RouteNoteInput]})routeNotes: [RouteNote]) {
    return this.grpcTestService.routeChatt(routeNotes);
  }
  
}