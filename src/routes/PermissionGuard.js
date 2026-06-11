import MyResult from '../components/myResult/MyResult';
import useWorkspaceStore from '../stores/workspaceStore';

export default function PermissionGuard({ perm, children, fallback }) {
  const can = useWorkspaceStore((s) => s.can);

  if (perm && !can(perm)) {
    return (
      fallback ?? (
        <MyResult
          status="403"
          title="No access"
          subTitle="You don't have permission to view this in the current workspace."
        />
      )
    );
  }
  return children;
}
