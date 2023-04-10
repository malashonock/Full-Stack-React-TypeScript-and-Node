export class QueryResult<T> {
  constructor(public data?: T, public messages?: string[]) {}
}