import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { ForumPost } from 'model';
import { Counter } from '..';

interface LikesCountProps {
  post: ForumPost;
}

export const LikesCount = ({ post }: LikesCountProps) => {
  return <Counter count={post.likesCount} icon={faHeart} />;
};
