import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { CounterBase } from '../CounterBase';

interface LikesCountProps {
  count: number;
}

export const LikesCount = ({ count }: LikesCountProps) => {
  return <CounterBase count={count} icon={faHeart} />;
};
