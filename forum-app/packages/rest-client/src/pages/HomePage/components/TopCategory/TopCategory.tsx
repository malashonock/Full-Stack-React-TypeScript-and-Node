import { Link } from 'react-router-dom';

import { ThreadDto } from '@shared/types';

import './TopCategory.scss';

interface TopCategoryProps {
  topThreads: ThreadDto[];
}

export const TopCategory = ({ topThreads }: TopCategoryProps) => {
  return topThreads.length > 0 ? (
    <section className="top-category">
      <h3 className="top-category__title">{topThreads[0].category.name}</h3>
      <ul className="top-category__threads">
        {topThreads.map((thread: ThreadDto) => (
          <li key={thread.id} className="top-category__thread">
            <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  ) : null;
};
