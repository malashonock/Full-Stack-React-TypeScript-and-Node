import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './CounterBase.scss';

interface CounterProps {
  count: number;
  icon: IconDefinition;
}

export const CounterBase = ({ count, icon }: CounterProps) => {
  return (
    <div className="counter">
      <span className="counter__count">{count}</span>
      <FontAwesomeIcon icon={icon} className="counter__icon" />
    </div>
  );
};
