import DropDown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';

import { Category } from 'model';
import { mockCategories } from 'services/mocks';

import './ThreadCategory.scss';

interface ThreadCategoryProps {
  categoryName?: string;
}

export const ThreadCategory = ({ categoryName }: ThreadCategoryProps) => {
  const options: Option[] = mockCategories.map(
    (category: Category): Option => ({
      value: category.id,
      label: category.name,
    }),
  );

  const defaultOption = options[0];

  const handleSelect = (option: Option) => {
    console.log(option);
  };

  return (
    <div className="thread-category">
      <strong className="thread-category__label">{categoryName}</strong>
      <DropDown
        className="thread-category__select"
        options={options}
        onChange={handleSelect}
        value={defaultOption}
        placeholder="Select a category"
      />
    </div>
  );
};
