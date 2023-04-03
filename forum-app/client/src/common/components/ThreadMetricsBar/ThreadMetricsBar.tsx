import { forDesktop } from 'common/hocs';
import { CommentsCount, LikesCount } from 'common/components';

import './ThreadMetricsBar.scss';

interface ThreadMetricsProps {
  likesCount: number;
  commentsCount: number;
}

export const ThreadMetricsBar = forDesktop(
  ({ likesCount, commentsCount }: ThreadMetricsProps) => (
    <aside className="thread-metrics-bar">
      <LikesCount count={likesCount} />
      <CommentsCount count={commentsCount} />
    </aside>
  ),
);
