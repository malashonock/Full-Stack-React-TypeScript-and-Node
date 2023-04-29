import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThreadDto } from '@shared/types';

import { SectionDivider } from 'common/components/layout';
import {
  ChangePasswordForm,
  UserThreadCommentsList,
  UserThreadsList,
} from './components';
import { ThreadItem } from 'model';
import { getUserThreadComments } from 'services';
import { useUserThreads } from 'hooks';

import './UserProfilePage.scss';

export const UserProfilePage = () => {
  const { userId } = useParams();

  const [userThreads, setUserThreads] = useState<ThreadDto[]>([]);
  const [userThreadComments, setUserThreadComments] = useState<ThreadItem[]>(
    [],
  );

  useUserThreads(userId, (threads: ThreadDto[]) => setUserThreads(threads));

  useEffect(() => {
    if (!userId) {
      return;
    }

    (async () => {
      const fetchedUserThreadComments = await getUserThreadComments(userId);
      setUserThreadComments(fetchedUserThreadComments);
    })();
  }, [userId]);

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
        <UserThreadCommentsList threadComments={userThreadComments} />
      </div>
    </div>
  );
};
