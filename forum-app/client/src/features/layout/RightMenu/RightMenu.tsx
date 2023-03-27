import { useEffect, useState } from 'react';
import { groupBy } from 'lodash';

import { forDesktop } from 'common/hocs';
import { getTopCategories } from 'services';
import { TopCategory } from 'common/components';

import './RightMenu.scss';

export const RightMenu = forDesktop(() => {
  const [topCategories, setTopCategories] = useState<
    JSX.Element[] | undefined
  >();

  useEffect(() => {
    (async () => {
      const fetchedTopCategories = await getTopCategories();
      const groupedTopCategories = groupBy(fetchedTopCategories, 'category');
      const topCategoryComponents = [] as JSX.Element[];

      for (const category in groupedTopCategories) {
        if (
          Object.prototype.hasOwnProperty.call(groupedTopCategories, category)
        ) {
          const topCategoryThreads = groupedTopCategories[category];
          const topCategoryComponent = (
            <TopCategory key={category} topThreads={topCategoryThreads} />
          );
          topCategoryComponents.push(topCategoryComponent);
        }
      }

      setTopCategories(topCategoryComponents);
    })();
  }, []);

  return <div className="rightmenu">{topCategories}</div>;
});
