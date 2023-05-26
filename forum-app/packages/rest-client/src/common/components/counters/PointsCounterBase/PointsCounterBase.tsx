import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import './PointsCounterBase.scss';
import { memo } from 'react';

type PointsCounterBaseProps = {
  count: number;
  onUpvote: () => void;
  onDownvote: () => void;
};

export const PointsCounterBase = memo(
  ({ count, onUpvote, onDownvote }: PointsCounterBaseProps) => {
    const handleUpvote = (): void => {
      onUpvote();
    };

    const handleDownvote = async (): Promise<void> => {
      onDownvote();
    };

    return (
      <div className="points-counter">
        <button
          className={cn('points-counter__btn', 'points-counter__btn--upvote')}
          onClick={handleUpvote}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <span className="points-counter__sum">{count}</span>
        <button
          className={cn('points-counter__btn', 'points-counter__btn--downvote')}
          onClick={handleDownvote}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        <FontAwesomeIcon icon={faHeart} className="points-counter__icon" />
      </div>
    );
  },
);
