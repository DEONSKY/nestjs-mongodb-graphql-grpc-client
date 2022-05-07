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
