import express from 'express';

export interface Response<TSerialized = any> extends express.Response {
  json(data: TSerialized): this;
}
