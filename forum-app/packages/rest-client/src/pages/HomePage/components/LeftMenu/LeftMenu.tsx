import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { ThreadCategoryDto } from '@shared/types';

import { useCategories, useWindowDimensions } from 'hooks';

import './LeftMenu.scss';

export const LeftMenu = () => {
  const { categories } = useCategories();
  const { width } = useWindowDimensions();

  if (width <= 768) {
    return null;
  }

  return (
    <div className="leftmenu">
      <ul className="categories">
        {categories?.map(({ id, name }: ThreadCategoryDto) => (
          <li key={id} className="category">
            <NavLink
              to={`/categorythreads/${id}`}
              className={({ isActive }) =>
                cn('nav-link', { 'nav-link--active': isActive })
              }
            >
              {name}
            </NavLink>
          </li>
        )) ?? 'Loading categories...'}
      </ul>
    </div>
  );
};
