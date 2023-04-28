import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThreadCard } from '..';
import { Category, Thread } from 'model';
import { ThreadCategoryService, getThreadsByCategoryId } from 'services';

import './Main.scss';

export const Main = () => {
  const { categoryId } = useParams();

  const [activeCategory, setActiveCategory] = useState<Category | undefined>();
  const [categoryThreads, setCategoryThreads] = useState<
    Thread[] | undefined
  >();

  useEffect(() => {
    if (categoryId) {
      (async () => {
        const fetchedCategory = await ThreadCategoryService.getCategoryById(
          categoryId,
        );
        setActiveCategory(fetchedCategory);

        const fetchedThreads = await getThreadsByCategoryId(categoryId);
        setCategoryThreads(fetchedThreads);
      })();
    } else {
      setActiveCategory(undefined);
      setCategoryThreads(undefined);
    }
  }, [categoryId]);

  return (
    <main className="content">
      <div className="active-category">
        <h2>{activeCategory?.name || 'Loading category threads...'}</h2>
        <hr />
      </div>
      {categoryThreads?.map(
        (thread: Thread): JSX.Element => (
          <ThreadCard key={thread.id} thread={thread} />
        ),
      )}
    </main>
  );
};
