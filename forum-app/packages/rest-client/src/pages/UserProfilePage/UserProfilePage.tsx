import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThreadCommentDto, ThreadDto } from '@shared/types';

import { SectionDivider } from 'common/components/layout';
import {
  ChangePasswordForm,
  UserCommentsList,
  UserThreadsList,
} from './components';
import { useUserComments, useUserThreads } from 'hooks';

import './UserProfilePage.scss';

export const UserProfilePage = () => {
  const { userId } = useParams();
  const userThreads = useUserThreads(userId);
  const userComments = useUserComments(userId);

  return (
    <div className="user-profile">
      <div className="user-profile__change-password">
        <ChangePasswordForm />
      </div>
      <SectionDivider />
      <div className="user-profile__user-threads">
        <UserThreadsList threads={userThreads} />
      </div>
      <div className="user-profile__user-thread-comments">
        <UserCommentsList comments={userComments} />
      </div>
    </div>
  );
};
