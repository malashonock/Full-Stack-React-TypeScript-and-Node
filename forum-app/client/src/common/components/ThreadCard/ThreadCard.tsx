import { Link } from 'react-router-dom';

import { Thread } from 'model';
import { LikesCount, CommentsCount, ViewsCount } from 'common/components';
import { forDesktop, forMobile } from 'common/hocs';

import './ThreadCard.scss';

interface ThreadCardProps {
  thread: Thread;
}

const LikesCountMobile = forMobile(LikesCount);
const CommentsCountMobile = forMobile(CommentsCount);

const SidebarDesktop = forDesktop(({ thread }: ThreadCardProps) => (
  <aside className="thread-card__sidebar-right">
    <LikesCount post={thread} />
    <CommentsCount thread={thread} />
  </aside>
));

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
          <ViewsCount post={thread} />
          <LikesCountMobile post={thread} />
          <CommentsCountMobile thread={thread} />
        </footer>
      </div>
      <SidebarDesktop thread={thread} />
    </section>
  );
};
