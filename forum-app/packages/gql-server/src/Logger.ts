import { IFieldResolver } from '@graphql-tools/utils';

import { GqlContext } from './types';

export const log = async (
  resolver: IFieldResolver<any, GqlContext>,
  parent: any,
  args: any,
  context: GqlContext,
  info: any,
) => {
  if (!parent) {
    console.log('Start logging');
  }

  const result = await resolver(parent, args, context, info);
  console.log('Finished call to resolver');

  return result;
};
