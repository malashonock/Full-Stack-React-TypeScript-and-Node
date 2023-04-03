import { useEffect, useState } from 'react';

import { ThreadComment } from '..';
import { ThreadItem } from 'model';

import './ThreadCommentsBuilder.scss';

interface ThreadResponsesBuilderProps {
  threadItems?: ThreadItem[];
}

export const ThreadCommentsBuilder = ({
  threadItems,
}: ThreadResponsesBuilderProps) => {
  const [threadComments, setThreadComments] = useState<
    JSX.Element | undefined
  >();

  useEffect(() => {
    if (threadItems) {
      const comments = threadItems.map(
        (threadItem: ThreadItem): JSX.Element => (
          <li key={threadItem.id}>
            <ThreadComment
              body={threadItem.body}
              userName={threadItem.userName}
              lastModifiedOn={threadItem.createdOn}
              likesCount={threadItem.likesCount}
            />
          </li>
        ),
      );

      setThreadComments(
        <ul className="thread-comments__comments">{comments}</ul>,
      );
    }
  }, [threadItems]);

  return (
    <div className="thread-comments">
      <strong className="thread-comments__title">Responses</strong>
      {threadComments}
    </div>
  );
};
