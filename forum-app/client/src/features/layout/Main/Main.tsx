import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThreadCard } from 'common/components';
import { Category, Thread } from 'model';
import { getCategoryById, getThreadsByCategoryId } from 'services';

import './Main.scss';

export const Main = () => {
  const { categoryId } = useParams();

  const [category, setCategory] = useState<Category | undefined>();
  const [threads, setThreads] = useState<Thread[] | undefined>();

  useEffect(() => {
    if (categoryId) {
      (async () => {
        const fetchedCategory = await getCategoryById(categoryId);
        setCategory(fetchedCategory);

        const fetchedThreads = await getThreadsByCategoryId(categoryId);
        setThreads(fetchedThreads);
      })();
    } else {
      setCategory(undefined);
      setThreads(undefined);
    }
  }, [categoryId]);

  return (
    <main className="content">
      {threads?.map(
        (thread: Thread): JSX.Element => (
          <ThreadCard key={thread.id} thread={thread} />
        ),
      )}
    </main>
  );
};
