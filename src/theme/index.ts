import { ColorSchemeName } from 'react-native'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native'
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper'

export type ThemeType = NavigationTheme & ReactNativePaper.Theme

const CombinedDefaultTheme: ThemeType = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...{ ...PaperDefaultTheme.colors, primary: '#ff1744', accent: '#ff616f' },
  },
}
const CombinedDarkTheme: ThemeType = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...{ ...PaperDarkTheme.colors, primary: '#ff1744', accent: '#ff616f' },
  },
}

export const getTheme = (
  colorScheme: string,
  systemColorScheme: ColorSchemeName,
): ThemeType => {
  // check if dark mode is enabled
  let isDarkMode = false
  if (colorScheme === 'system') {
    isDarkMode = systemColorScheme === 'dark'
  } else if (colorScheme === 'dark') {
    isDarkMode = true
  } else if (colorScheme === 'light') {
    isDarkMode = false
  }

  return isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme
}
