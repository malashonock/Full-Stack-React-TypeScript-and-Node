import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { SectionDivider, ThreadMetricsBar } from 'common/components';
import {
  ThreadBody,
  ThreadCategory,
  ThreadCommentsBuilder,
  ThreadHeader,
  ThreadTitle,
} from './components';
import { useOnViewEffect, useThread, useThreadComments } from 'hooks';
import { ThreadService } from 'services';

import './ThreadPage.scss';

export const ThreadPage = () => {
  const { threadId } = useParams();
  const { thread, isThreadLoading } = useThread(threadId);
  const { comments, areCommentsLoading } = useThreadComments(threadId);
  const threadRef = useRef<HTMLDivElement>(null);
  const threadTreeLoadedRef = useRef(false);

  useEffect(() => {
    threadTreeLoadedRef.current = Boolean(
      threadId && !isThreadLoading && !areCommentsLoading,
    );
  }, [threadId, isThreadLoading, areCommentsLoading]);

  useOnViewEffect(
    threadRef,
    async () => {
      if (threadId) {
        await ThreadService.viewThread(threadId);
      }
    },
    !threadTreeLoadedRef.current,
  );

  return (
    <div className="thread">
      <div className="thread__content" ref={threadRef}>
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
              threadId={threadId || ''}
              pointsSum={thread.pointsSum}
              commentsCount={thread.commentsCount}
            />
          ) : null}
        </div>
      </div>
      <div className="thread__comments">
        <SectionDivider />
        <ThreadCommentsBuilder
          comments={comments}
          threadTreeLoadedRef={threadTreeLoadedRef}
        />
      </div>
    </div>
  );
};
