import { ThreadDto } from '@shared/types';

import { UserThreadLink } from '../UserThreadLink';

import './UserThreadsList.scss';

interface UserThreadsListProps {
  threads: ThreadDto[];
}

export const UserThreadsList = ({ threads }: UserThreadsListProps) => {
  return (
    <div className="user-threads">
      <strong className="user-threads__heading">User threads</strong>
      <ul className="user-threads__list">
        {threads.map((thread: ThreadDto) => (
          <li className="user-threads__link" key={thread.id}>
            <UserThreadLink threadId={thread.id} text={thread.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};
