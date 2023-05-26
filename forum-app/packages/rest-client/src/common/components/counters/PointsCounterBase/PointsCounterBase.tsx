import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import { VoteType } from '@shared/types';

import './PointsCounterBase.scss';

type PointsCounterBaseProps = {
  count: number;
  isAuthenticated: boolean;
  isOwn: boolean;
  currentVote: VoteType | null;
  onUpvote: () => void;
  onDownvote: () => void;
};

export const PointsCounterBase = memo(
  ({
    count,
    isAuthenticated,
    isOwn,
    currentVote,
    onUpvote,
    onDownvote,
  }: PointsCounterBaseProps) => {
    const canUpvote = Boolean(
      isAuthenticated &&
        !isOwn &&
        (!currentVote || currentVote === VoteType.Upvote),
    );
    const canDownvote = Boolean(
      isAuthenticated &&
        !isOwn &&
        (!currentVote || currentVote === VoteType.Downvote),
    );

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
          disabled={!canUpvote}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <span className="points-counter__sum">{count}</span>
        <button
          className={cn('points-counter__btn', 'points-counter__btn--downvote')}
          onClick={handleDownvote}
          disabled={!canDownvote}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        <FontAwesomeIcon icon={faHeart} className="points-counter__icon" />
      </div>
    );
  },
);
