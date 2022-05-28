import { ServerDuplexStream, ServerReadableStream } from '@grpc/grpc-js';
import { Observable,ReadableStreamLike, Subscription } from 'rxjs';
import { PointInput, RectangleInput, RouteNoteInput } from './grpc-test.input';

export interface IGrpcService {
  getFeature(point: PointInput): Observable<any>,
  listFeatures(rectangle:  RectangleInput): Observable<any>
  recordRoute(points: Observable<PointInput>) : Observable<any>
  routeChat(routeNote: Observable<RouteNoteInput>): Observable<any>
}

export interface Point {
  latitude: number;
  longitude :number;
}

export interface Feature {
  name: string;
  location :Point;
}

export interface Rectangle {
  lo: Point;
  hi: Point;
}

export interface RouteNote {
  location: Point;
  message: string;
}

export interface RouteSummary {
  // The number of points received.
  point_count: number;

  // The number of known features passed while traversing the route.
  feature_count: number;

  // The distance covered in metres.
  distance: number;

  // The duration of the traversal in seconds.
  elapsed_time: number;
}
