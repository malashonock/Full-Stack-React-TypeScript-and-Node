import { useEffect, useState } from 'react';

import { useWindowDimensions } from 'hooks';
import { Category } from 'model';
import { getCategories } from 'services';

export const LeftMenu = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const { width } = useWindowDimensions();

  const fetchCategories = async (): Promise<void> => {
    const categories = await getCategories();
    setCategories(categories);
  };

  useEffect(() => {
    try {
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  });

  if (width <= 768) {
    return null;
  }

  return (
    <div className="leftmenu">
      <ul className="categories">
        {categories?.map(({ id, name }: Category) => (
          <li key={id} className="category">
            {name}
          </li>
        )) ?? 'Left Menu'}
      </ul>
    </div>
  );
};
