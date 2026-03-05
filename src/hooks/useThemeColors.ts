import {useColorScheme} from 'react-native';
import {Colors, ThemeColors} from '../theme/colors';

export function useThemeColors(): {colors: ThemeColors; isDark: boolean} {
  const isDark = useColorScheme() === 'dark';
  return {
    colors: isDark ? Colors.dark : Colors.light,
    isDark,
  };
}
