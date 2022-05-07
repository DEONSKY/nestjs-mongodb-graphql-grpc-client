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
  point_count: number;
  @Field({ nullable: true })
  feature_count: number;
  @Field({ nullable: true })
  distance: number;
  @Field({ nullable: true })
  elapsed_time: number;
}