import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SectionDivider } from 'common/components/layout';
import {
  ChangePasswordForm,
  UserThreadCommentsList,
  UserThreadsList,
} from './components';

import './UserProfilePage.scss';
import { Thread, ThreadItem } from 'model';
import { getUserThreadComments, getUserThreads } from 'services';

export const UserProfilePage = () => {
  const { userId } = useParams();

  const [userThreads, setUserThreads] = useState<Thread[]>([]);
  const [userThreadComments, setUserThreadComments] = useState<ThreadItem[]>(
    [],
  );

  useEffect(() => {
    if (!userId) {
      return;
    }

    (async () => {
      const fetchedUserThreads = await getUserThreads(userId);
      setUserThreads(fetchedUserThreads);

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
