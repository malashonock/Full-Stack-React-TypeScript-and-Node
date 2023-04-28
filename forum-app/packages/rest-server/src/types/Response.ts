import express from 'express';

export interface Response<TJson = any> extends express.Response {
  json(data: TJson): this;
}
