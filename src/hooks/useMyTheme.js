import { theme } from 'antd';
import useThemeStore from '../stores/themeStore';

export default function useMyTheme() {
  const isDark = useThemeStore((s) => s.dark);
  const { token } = theme.useToken();

  return { isDark, token };
}
