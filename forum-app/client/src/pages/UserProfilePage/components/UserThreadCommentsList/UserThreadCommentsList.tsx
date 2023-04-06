import { ThreadItem } from 'model';
import { UserThreadLink } from '../UserThreadLink';

import './UserThreadCommentsList.scss';

interface UserThreadCommentsListProps {
  threadComments: ThreadItem[];
}

export const UserThreadCommentsList = ({
  threadComments,
}: UserThreadCommentsListProps) => {
  return (
    <div className="user-thread-comments">
      <strong className="user-thread-comments__heading">User comments</strong>
      <ul className="user-thread-comments__list">
        {threadComments.map((threadComment: ThreadItem) => (
          <li className="user-thread-link" key={threadComment.threadId}>
            <UserThreadLink
              threadId={threadComment.threadId}
              text={threadComment.body}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
