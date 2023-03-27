import { faReplyAll } from '@fortawesome/free-solid-svg-icons';
import { Thread } from 'model';
import { Counter } from '..';

interface CommentsCountProps {
  thread: Thread;
}

export const CommentsCount = ({ thread }: CommentsCountProps) => {
  return <Counter count={thread.threadItems.length} icon={faReplyAll} />;
};
