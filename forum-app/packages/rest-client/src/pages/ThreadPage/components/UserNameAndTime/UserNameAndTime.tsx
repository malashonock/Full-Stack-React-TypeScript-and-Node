import { getTimePastIfLessThanDay } from 'common/utils';

import './UserNameAndTime.scss';

interface UserNameAndTimeProps {
  userName?: string;
  lastModifiedOn?: Date;
}

export const UserNameAndTime = ({
  userName,
  lastModifiedOn,
}: UserNameAndTimeProps) => {
  return (
    <span className="user-info">
      <strong className="user-info__user-name">{userName}</strong>
      <label className="user-info__last-modified-on">
        {lastModifiedOn ? getTimePastIfLessThanDay(lastModifiedOn) : ''}
      </label>
    </span>
  );
};
