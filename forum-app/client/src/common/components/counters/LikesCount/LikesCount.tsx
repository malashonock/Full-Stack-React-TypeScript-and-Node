import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { ForumPost } from 'model';
import { CounterBase } from '../CounterBase';

interface LikesCountProps {
  post: ForumPost;
}

export const LikesCount = ({ post }: LikesCountProps) => {
  return <CounterBase count={post.likesCount} icon={faHeart} />;
};
