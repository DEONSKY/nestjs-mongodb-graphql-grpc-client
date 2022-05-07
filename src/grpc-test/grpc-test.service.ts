import { Model, FilterQuery } from 'mongoose';
import { Injectable, Inject, Logger, Body, Get, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IGrpcService, Point, Rectangle, RouteNote } from './grpc.interface';
import { microserviceOptions } from './grpc.options';
import { first, of, ReplaySubject, toArray } from 'rxjs';
import { PointInput, RectangleInput } from './grpc-test.input';

@Injectable()
export class GrpcTestService {
  private logger = new Logger('GrpcTestService');
  private util = require('util')

  @Client(microserviceOptions) // <-- Add
  private client: ClientGrpc;  // <-- this

  private grpcService: IGrpcService;

  onModuleInit() {                                                            // <--
    this.grpcService = this.client.getService<IGrpcService>('RouteGuide'); // <-- Add this
  }

  async getFeature( data: PointInput) {

    return this.grpcService.getFeature(data); // <-- to this
  }

  async getFeaturess( data: RectangleInput) {

    const res = this.grpcService.listFeatures(data)
    res.subscribe((v) => this.logger.log(`value: ${v.name}`));
    return res.pipe(toArray())
  }

  async recordRoutee( data: PointInput[]) {

    const upstream = new ReplaySubject<PointInput>();

    const ob = this.grpcService.recordRoute(upstream)

    for (const val of data){
      this.logger.log("Sending", val)
      await this.sleep(100)
      upstream.next(val)
    }
    upstream.complete()
    return ob
  }

  async routeChatt( data: RouteNote[]) {
    
    const upstream = new ReplaySubject<RouteNote>();
    
    let res:RouteNote[]=[];

    const ob = this.grpcService.routeChat(upstream)
    const sub = ob.subscribe((v) => {
      this.logger.log(`value: ${v.message}`)
      res.push(v)
    });
    //ob.subscribe((v) => console.log(`value: ${v.message}`));
    for(const val of data){
      console.log(`Sending: ${val.message}`);
      await this.sleep(1000)
      upstream.next(val);
    }
    
    //ob.subscribe(y=>console.log(y,new Date()))


    upstream.complete()
    return res
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
