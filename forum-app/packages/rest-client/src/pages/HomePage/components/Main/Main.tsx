import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThreadCategoryDto, ThreadDto } from '@shared/types';

import { ThreadCard } from '..';
import { ThreadCategoryService, ThreadService } from 'services';

import './Main.scss';

export const Main = () => {
  const { categoryId } = useParams();

  const [activeCategory, setActiveCategory] = useState<
    ThreadCategoryDto | undefined
  >();
  const [categoryThreads, setCategoryThreads] = useState<ThreadDto[]>([]);

  useEffect(() => {
    if (categoryId) {
      (async () => {
        const fetchedCategory = await ThreadCategoryService.getCategoryById(
          categoryId,
        );
        setActiveCategory(fetchedCategory);

        const fetchedThreads = await ThreadService.getCategoryThreads(
          categoryId,
        );
        setCategoryThreads(fetchedThreads);
      })();
    } else {
      setActiveCategory(undefined);
      setCategoryThreads([]);
    }
  }, [categoryId]);

  return (
    <main className="content">
      <div className="active-category">
        <h2>{activeCategory?.name || 'Loading category threads...'}</h2>
        <hr />
      </div>
      {categoryThreads.length > 0 ? (
        categoryThreads.map(
          (thread: ThreadDto): JSX.Element => (
            <ThreadCard key={thread.id} thread={thread} />
          ),
        )
      ) : (
        <p>No threads under this category yet</p>
      )}
    </main>
  );
};
