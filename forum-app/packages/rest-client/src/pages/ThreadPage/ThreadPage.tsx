import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThreadDto } from '@shared/types';

import { SectionDivider, ThreadMetricsBar } from 'common/components';
import {
  ThreadBody,
  ThreadCategory,
  ThreadCommentsBuilder,
  ThreadHeader,
  ThreadTitle,
} from './components';
import { ThreadService, getUserThreadComments } from 'services';
import { ThreadItem } from 'model';

import './ThreadPage.scss';

export const ThreadPage = () => {
  const [thread, setThread] = useState<ThreadDto | undefined>();
  const [threadComments, setThreadComments] = useState<
    ThreadItem[] | undefined
  >();
  const { threadId } = useParams();

  useEffect(() => {
    (async () => {
      if (threadId) {
        const fetchedThread = await ThreadService.getThreadById(threadId);
        setThread(fetchedThread);

        const fetchedThreadComments = await getUserThreadComments('');
        setThreadComments(fetchedThreadComments);
      }
    })();
  }, [threadId]);

  return (
    <div className="thread">
      <div className="thread__content">
        <div className="thread__post">
          <ThreadHeader
            authorName={thread?.author.name}
            lastModifiedOn={
              thread ? new Date(thread.lastModifiedOn) : new Date()
            }
            title={thread?.title}
          />
          <ThreadCategory categoryName={thread?.category?.name} />
          <ThreadTitle title={thread?.title} />
          <ThreadBody body={thread?.body} />
        </div>
        <div className="thread__metrics">
          {thread ? (
            <ThreadMetricsBar
              pointsSum={thread.pointsSum}
              commentsCount={thread.commentsCount}
            />
          ) : null}
        </div>
      </div>
      <div className="thread__comments">
        <SectionDivider />
        <ThreadCommentsBuilder threadItems={threadComments} />
      </div>
    </div>
  );
};
