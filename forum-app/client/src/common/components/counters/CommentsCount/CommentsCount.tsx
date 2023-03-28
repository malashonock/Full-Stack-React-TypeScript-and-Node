import { faReplyAll } from '@fortawesome/free-solid-svg-icons';

import { Thread } from 'model';
import { CounterBase } from '../CounterBase';

interface CommentsCountProps {
  thread: Thread;
}

export const CommentsCount = ({ thread }: CommentsCountProps) => {
  return <CounterBase count={thread.threadItems.length} icon={faReplyAll} />;
};
