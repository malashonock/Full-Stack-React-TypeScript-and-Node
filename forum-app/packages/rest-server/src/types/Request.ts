import express from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export type Request<
  TBody = any,
  TParams = ParamsDictionary,
  TQuery = qs.ParsedQs,
> = express.Request<TParams, any, TBody, TQuery>;
