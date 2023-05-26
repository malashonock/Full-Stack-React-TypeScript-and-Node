import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThreadCommentDto, ThreadDto } from '@shared/types';

import { SectionDivider, ThreadMetricsBar } from 'common/components';
import {
  ThreadBody,
  ThreadCategory,
  ThreadCommentsBuilder,
  ThreadHeader,
  ThreadTitle,
} from './components';
import { useThread, useThreadComments } from 'hooks';

import './ThreadPage.scss';

export const ThreadPage = () => {
  const { threadId } = useParams();
  const thread = useThread(threadId);
  const threadComments = useThreadComments(threadId);

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
              threadId={threadId || ''}
              pointsSum={thread.pointsSum}
              commentsCount={thread.commentsCount}
            />
          ) : null}
        </div>
      </div>
      <div className="thread__comments">
        <SectionDivider />
        <ThreadCommentsBuilder comments={threadComments} />
      </div>
    </div>
  );
};
