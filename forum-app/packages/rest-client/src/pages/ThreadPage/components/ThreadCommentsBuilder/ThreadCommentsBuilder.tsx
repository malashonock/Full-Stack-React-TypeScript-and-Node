import { ThreadCommentDto } from '@shared/types';

import { ThreadComment } from '..';

import './ThreadCommentsBuilder.scss';

interface ThreadResponsesBuilderProps {
  comments?: ThreadCommentDto[];
}

const sortCommentsByDate = (
  comment1: ThreadCommentDto,
  comment2: ThreadCommentDto,
): number => {
  const date1 = new Date(comment1.createdOn).getTime();
  const date2 = new Date(comment2.createdOn).getTime();
  return date1 - date2;
};

export const ThreadCommentsBuilder = ({
  comments,
}: ThreadResponsesBuilderProps) => {
  return (
    <div className="thread-comments">
      <strong className="thread-comments__title">Comments</strong>
      <ul className="thread-comments__comments">
        {comments && comments.length > 0 ? (
          comments.sort(sortCommentsByDate).map(
            (comment: ThreadCommentDto): JSX.Element => (
              <li key={comment.id}>
                <ThreadComment
                  body={comment.body}
                  userName={comment.author.name}
                  lastModifiedOn={new Date(comment.createdOn)}
                  pointsSum={comment.pointsSum}
                />
              </li>
            ),
          )
        ) : (
          <p>No comments yet</p>
        )}
      </ul>
    </div>
  );
};
