import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Point {
  @Field()
  latitude: number;
  @Field()
  longitude :number;
}

@ObjectType()
export class Feature {
  @Field({ nullable: true })
  name: string;
  @Field()
  location :Point;
}

@ObjectType()
export class Rectangle {
  @Field()
  lo: Point;
  @Field()
  hi: Point;
}

@ObjectType()
export class RouteNote {
  @Field()
  location: Point;
  @Field()
  message: string;
}

@ObjectType()
export class RouteSummary {
  @Field({ nullable: true })
  pointCount: number;
  @Field({ nullable: true })
  featureCount: number;
  @Field({ nullable: true })
  distance: number;
  @Field({ nullable: true })
  elapsedTime: number;
}