import { ThreadCommentDto } from '@shared/types';

import { UserThreadLink } from '../UserThreadLink';

import './UserCommentsList.scss';

interface UserThreadCommentsListProps {
  comments: ThreadCommentDto[];
}

export const UserCommentsList = ({ comments }: UserThreadCommentsListProps) => {
  return (
    <div className="user-thread-comments">
      <strong className="user-thread-comments__heading">User comments</strong>
      <ul className="user-thread-comments__list">
        {comments.map((comment: ThreadCommentDto) => (
          <li className="user-thread-link" key={comment.threadId}>
            <UserThreadLink threadId={comment.threadId} text={comment.body} />
          </li>
        ))}
      </ul>
    </div>
  );
};
