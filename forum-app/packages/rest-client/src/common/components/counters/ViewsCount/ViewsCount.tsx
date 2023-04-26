import { faEye } from '@fortawesome/free-solid-svg-icons';

import { CounterBase } from '../CounterBase';

interface ViewsCountProps {
  count: number;
}

export const ViewsCount = ({ count }: ViewsCountProps) => {
  return <CounterBase count={count} icon={faEye} />;
};
