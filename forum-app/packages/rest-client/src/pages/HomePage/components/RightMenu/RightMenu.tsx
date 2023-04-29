import { useEffect, useState } from 'react';
import { Dictionary, groupBy } from 'lodash';

import { ThreadDto } from '@shared/types';

import { forDesktop } from 'common/hocs';
import { ThreadService } from 'services';
import { TopCategory } from '..';

import './RightMenu.scss';

export const RightMenu = forDesktop(() => {
  const [topCategories, setTopCategories] = useState<
    JSX.Element[] | undefined
  >();

  useEffect(() => {
    (async () => {
      const fetchedTopCategories: ThreadDto[] =
        await ThreadService.getTopThreads();
      const groupedTopCategories: Dictionary<ThreadDto[]> = groupBy(
        fetchedTopCategories,
        'category.name',
      );
      const topCategoryComponents: JSX.Element[] = [];

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
