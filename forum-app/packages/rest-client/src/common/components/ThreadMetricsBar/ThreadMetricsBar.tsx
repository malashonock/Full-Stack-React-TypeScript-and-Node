import { forDesktop } from 'common/hocs';
import { CommentsCount, PointsCounter } from 'common/components';

import './ThreadMetricsBar.scss';

interface ThreadMetricsProps {
  pointsSum: number;
  commentsCount: number;
}

export const ThreadMetricsBar = forDesktop(
  ({ pointsSum, commentsCount }: ThreadMetricsProps) => (
    <aside className="thread-metrics-bar">
      <PointsCounter count={pointsSum} />
      <CommentsCount count={commentsCount} />
    </aside>
  ),
);
