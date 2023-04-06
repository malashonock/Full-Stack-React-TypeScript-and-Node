import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SectionDivider, ThreadMetricsBar } from 'common/components';
import { Thread as ThreadModel } from 'model';
import {
  ThreadBody,
  ThreadCategory,
  ThreadCommentsBuilder,
  ThreadHeader,
  ThreadTitle,
} from './components';
import { getThreadById } from 'services';

import './ThreadPage.scss';

export const ThreadPage = () => {
  const [thread, setThread] = useState<ThreadModel | undefined>();
  const { threadId } = useParams();

  useEffect(() => {
    (async () => {
      if (threadId) {
        const fetchedThread = await getThreadById(threadId);
        setThread(fetchedThread);
      }
    })();
  }, [threadId]);

  return (
    <div className="thread">
      <div className="thread__content">
        <div className="thread__post">
          <ThreadHeader
            userName={thread?.userName}
            lastModifiedOn={thread ? thread.lastModifiedOn : new Date()}
            title={thread?.title}
          />
          <ThreadCategory categoryName={thread?.category?.name} />
          <ThreadTitle title={thread?.title} />
          <ThreadBody body={thread?.body} />
        </div>
        <div className="thread__metrics">
          {thread ? (
            <ThreadMetricsBar
              likesCount={thread.likesCount}
              commentsCount={thread.threadItems.length}
            />
          ) : null}
        </div>
      </div>
      <div className="thread__comments">
        <SectionDivider />
        <ThreadCommentsBuilder threadItems={thread?.threadItems} />
      </div>
    </div>
  );
};
