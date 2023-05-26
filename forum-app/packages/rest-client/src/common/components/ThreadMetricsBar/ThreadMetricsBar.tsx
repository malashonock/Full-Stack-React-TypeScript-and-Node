import { forDesktop } from 'common/hocs';
import { CommentsCount, ThreadPointsCounter } from 'common/components';

import './ThreadMetricsBar.scss';

interface ThreadMetricsProps {
  threadId: string;
  pointsSum: number;
  commentsCount: number;
}

export const ThreadMetricsBar = forDesktop(
  ({ threadId, pointsSum, commentsCount }: ThreadMetricsProps) => (
    <aside className="thread-metrics-bar">
      <ThreadPointsCounter threadId={threadId} />
      <CommentsCount count={commentsCount} />
    </aside>
  ),
);
