import { faEye } from '@fortawesome/free-solid-svg-icons';

import { ForumPost } from 'model';
import { Counter } from '..';

interface ViewsCountProps {
  post: ForumPost;
}

export const ViewsCount = ({ post }: ViewsCountProps) => {
  return <Counter count={post.viewsCount} icon={faEye} />;
};
