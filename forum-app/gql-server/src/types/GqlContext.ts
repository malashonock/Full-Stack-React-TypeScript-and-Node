import { PubSub } from 'graphql-subscriptions';

export interface GqlContext {
  pubsub: PubSub;
}
