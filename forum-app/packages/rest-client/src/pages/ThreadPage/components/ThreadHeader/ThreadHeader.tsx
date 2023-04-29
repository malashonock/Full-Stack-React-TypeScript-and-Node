import { UserNameAndTime } from '..';

import './ThreadHeader.scss';

interface ThreadHeaderProps {
  authorName?: string;
  lastModifiedOn: Date;
  title?: string;
}

export const ThreadHeader = ({
  authorName,
  lastModifiedOn,
  title,
}: ThreadHeaderProps) => {
  return (
    <div className="thread-header">
      <h3 className="thread-header__title">{title}</h3>
      <UserNameAndTime userName={authorName} lastModifiedOn={lastModifiedOn} />
    </div>
  );
};
