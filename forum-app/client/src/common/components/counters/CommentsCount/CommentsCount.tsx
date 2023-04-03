import { faReplyAll } from '@fortawesome/free-solid-svg-icons';

import { CounterBase } from '../CounterBase';

interface CommentsCountProps {
  count: number;
}

export const CommentsCount = ({ count }: CommentsCountProps) => {
  return <CounterBase count={count} icon={faReplyAll} />;
};
