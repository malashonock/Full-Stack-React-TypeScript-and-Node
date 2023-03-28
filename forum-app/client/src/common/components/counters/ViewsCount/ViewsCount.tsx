import { faEye } from '@fortawesome/free-solid-svg-icons';

import { ForumPost } from 'model';
import { CounterBase } from '../CounterBase';

interface ViewsCountProps {
  post: ForumPost;
}

export const ViewsCount = ({ post }: ViewsCountProps) => {
  return <CounterBase count={post.viewsCount} icon={faEye} />;
};
