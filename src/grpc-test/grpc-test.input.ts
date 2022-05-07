import { Field, InputType } from '@nestjs/graphql';
import { Point, Feature,RouteNote } from './grpc-test.scheme';

@InputType()
export class PointInput {
  @Field()
  latitude: number;
  @Field()
  longitude :number;
}

@InputType()
export class RectangleInput {
  @Field()
  lo: PointInput;
  @Field()
  hi: PointInput;
}

@InputType()
export class RouteNoteInput {
  @Field()
  location: PointInput;
  @Field()
  message: string;
}
