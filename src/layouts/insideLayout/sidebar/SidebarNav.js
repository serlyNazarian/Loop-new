import { useMemo } from 'react';
import SidebarNavItem from './SidebarNavItem';
import { NAV } from '../insideLayoutConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import useWorkspaceStore from '../../../stores/workspaceStore';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';

const SidebarNav = ({ collapsed }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const can = useWorkspaceStore((s) => s.can);
  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const activeId = useWorkspaceStore((s) => s.activeId);

  const items = useMemo(
    () => NAV.filter((item) => item.perm === null || can(item.perm)),
    [can, workspaces, activeId] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const selectedKey = useMemo(() => {
    const matches = NAV.map((n) => n.key)
      .filter((k) => pathname === k || pathname.startsWith(k + '/'))
      .sort((a, b) => b.length - a.length);
    return matches[0] || '/dashboard';
  }, [pathname]);

  return (
    <MyFlexVertical gap={4} className="sidebar_scroll">
      {items.map((item) => (
        <SidebarNavItem
          item={item}
          key={item.key}
          collapsed={collapsed}
          active={selectedKey === item.key}
          onClick={() => navigate(item.key)}
        />
      ))}
    </MyFlexVertical>
  );
};

export default SidebarNav;
