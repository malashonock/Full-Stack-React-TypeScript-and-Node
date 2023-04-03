import { Link } from 'react-router-dom';

import { Thread } from 'model';
import { LikesCount, CommentsCount, ViewsCount } from 'common/components';
import { forMobile } from 'common/hocs';
import { ThreadMetricsBar } from 'common/components';

import './ThreadCard.scss';

interface ThreadCardProps {
  thread: Thread;
}

const LikesCountMobile = forMobile(LikesCount);
const CommentsCountMobile = forMobile(CommentsCount);

export const ThreadCard = ({ thread }: ThreadCardProps) => {
  return (
    <section className="thread-card">
      <div className="thread-card__main">
        <header className="thread-card__header">
          <Link to={`/categorythreads/${thread.category.id}`}>
            <strong>{thread.category.name}</strong>
          </Link>
          <span>{thread.userName}</span>
        </header>
        <Link to={`/thread/${thread.id}`} className="thread-card__content">
          <strong>{thread.title}</strong>
          <p>{thread.body}</p>
        </Link>
        <footer className="thread-card__footer">
          <ViewsCount count={thread.viewsCount} />
          <LikesCountMobile count={thread.likesCount} />
          <CommentsCountMobile count={thread.threadItems.length} />
        </footer>
      </div>
      <ThreadMetricsBar
        likesCount={thread.likesCount}
        commentsCount={thread.threadItems.length}
      />
    </section>
  );
};
