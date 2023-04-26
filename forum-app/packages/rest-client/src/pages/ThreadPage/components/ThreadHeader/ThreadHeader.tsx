import { UserNameAndTime } from '..';

import './ThreadHeader.scss';

interface ThreadHeaderProps {
  userName?: string;
  lastModifiedOn: Date;
  title?: string;
}

export const ThreadHeader = ({
  userName,
  lastModifiedOn,
  title,
}: ThreadHeaderProps) => {
  return (
    <div className="thread-header">
      <h3 className="thread-header__title">{title}</h3>
      <UserNameAndTime userName={userName} lastModifiedOn={lastModifiedOn} />
    </div>
  );
};
