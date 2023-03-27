import { CategoryThread } from 'model';

import './TopCategory.scss';

interface TopCategoryProps {
  topThreads: CategoryThread[];
}

export const TopCategory = ({ topThreads }: TopCategoryProps) => {
  return topThreads.length > 0 ? (
    <section className="top-category">
      <h3 className="top-category__title">{topThreads[0].category}</h3>
      <ul className="top-category__threads">
        {topThreads.map((topThread: CategoryThread) => (
          <li key={topThread.id} className="top-category__thread">
            {topThread.title}
          </li>
        ))}
      </ul>
    </section>
  ) : null;
};
