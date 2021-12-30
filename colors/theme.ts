/*
 * @Author: Chenxu
 * @Date: 2021-12-17 12:35:07
 * @LastEditTime: 2021-12-30 17:00:23
 * @Msg: Nothing
 */
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';

const CustomColors = {
  primary: '#3975C6',
  secondary: '#96b6e0',
}

export const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...CustomColors,
    background: '#F5F7FA',
    topBarColor: CustomColors.primary,
    bottomBarColor: '#FAFBFC'
  },
};

export const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...CustomColors
  },
};

