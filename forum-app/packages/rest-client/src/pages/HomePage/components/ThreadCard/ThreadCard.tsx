import { Link } from 'react-router-dom';

import { ThreadDto } from '@shared/types';

import { PointsCounter, CommentsCount, ViewsCount } from 'common/components';
import { forMobile } from 'common/hocs';
import { ThreadMetricsBar } from 'common/components';

import './ThreadCard.scss';

interface ThreadCardProps {
  thread: ThreadDto;
}

const PointsSumMobile = forMobile(PointsCounter);
const CommentsCountMobile = forMobile(CommentsCount);

export const ThreadCard = ({ thread }: ThreadCardProps) => {
  return (
    <section className="thread-card">
      <div className="thread-card__main">
        <header className="thread-card__header">
          <Link to={`/categorythreads/${thread.category.id}`}>
            <strong>{thread.category.name}</strong>
          </Link>
          <span>{thread.author.name}</span>
        </header>
        <Link to={`/thread/${thread.id}`} className="thread-card__content">
          <strong>{thread.title}</strong>
          <p>{thread.body}</p>
        </Link>
        <footer className="thread-card__footer">
          <ViewsCount count={thread.viewsCount} />
          <PointsSumMobile count={thread.pointsSum} />
          <CommentsCountMobile count={thread.commentsCount} />
        </footer>
      </div>
      <ThreadMetricsBar
        pointsSum={thread.pointsSum}
        commentsCount={thread.commentsCount}
      />
    </section>
  );
};
