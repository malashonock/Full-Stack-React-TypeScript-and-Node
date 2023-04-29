import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThreadCategoryDto, ThreadDto } from '@shared/types';

import { ThreadCard } from '..';
import { useCategory, useCategoryThreads } from 'hooks';

import './Main.scss';

export const Main = () => {
  const { categoryId } = useParams();

  const [activeCategory, setActiveCategory] = useState<
    ThreadCategoryDto | undefined
  >();
  const [categoryThreads, setCategoryThreads] = useState<ThreadDto[]>([]);

  useCategory(categoryId, (category: ThreadCategoryDto) =>
    setActiveCategory(category),
  );
  useCategoryThreads(categoryId, (threads: ThreadDto[]) =>
    setCategoryThreads(threads),
  );

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
