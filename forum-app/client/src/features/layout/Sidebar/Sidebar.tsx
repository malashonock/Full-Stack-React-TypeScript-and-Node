import { Menu } from 'features/layout';
import { forDesktop } from 'common/hocs';

export const Sidebar = forDesktop(() => {
  return (
    <aside className="sidebar">
      <Menu />
    </aside>
  );
});
