import { Menu } from 'common/components/layout';
import { forDesktop } from 'common/hocs';

export const DesktopSidebar = forDesktop(() => {
  return (
    <aside className="sidebar">
      <Menu />
    </aside>
  );
});
