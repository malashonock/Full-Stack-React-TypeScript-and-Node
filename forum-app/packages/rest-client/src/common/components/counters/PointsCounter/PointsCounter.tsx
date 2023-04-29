import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { CounterBase } from '../CounterBase';

interface PointsCounterProps {
  count: number;
}

export const PointsCounter = ({ count }: PointsCounterProps) => {
  return <CounterBase count={count} icon={faHeart} />;
};
