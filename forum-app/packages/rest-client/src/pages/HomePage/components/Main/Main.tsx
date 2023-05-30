import { useParams } from 'react-router-dom';

import { ThreadDto } from '@shared/types';

import { ThreadCard } from '..';
import { useCategory, useCategoryThreads } from 'hooks';

import './Main.scss';

export const Main = () => {
  const { categoryId } = useParams();
  const { category: activeCategory } = useCategory(categoryId);
  const { categoryThreads } = useCategoryThreads(categoryId);

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
