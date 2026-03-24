import { createTheme, type MantineColorsTuple } from '@mantine/core';

const purple: MantineColorsTuple = [
  '#f3edff',
  '#e2d5f8',
  '#c6aaef',
  '#ab80e6',
  '#9462d9',
  '#7C5CBF',
  '#6E4FB0',
  '#5F42A0',
  '#513790',
  '#3F2A78',
];

const teal: MantineColorsTuple = [
  '#e6fcf5',
  '#c3fae8',
  '#96f2d7',
  '#63e6be',
  '#38d9a9',
  '#2DD4A8',
  '#20c997',
  '#12b886',
  '#0ca678',
  '#099268',
];

const magenta: MantineColorsTuple = [
  '#fef0f5',
  '#fcdce8',
  '#f9c0d5',
  '#f5a3c2',
  '#f187af',
  '#E879A8',
  '#d4628f',
  '#bf4c77',
  '#a93960',
  '#8c2a4c',
];

const gold: MantineColorsTuple = [
  '#fff9eb',
  '#fff0c5',
  '#ffe69e',
  '#ffd970',
  '#F5B544',
  '#e8a630',
  '#d09522',
  '#b88418',
  '#9f7310',
  '#7a590d',
];

export const theme = createTheme({
  primaryColor: 'purple',
  colors: {
    purple,
    teal,
    magenta,
    gold,
    dark: [
      '#F0F6FC',
      '#E6EDF3',
      '#C9D1D9',
      '#8B949E',
      '#484F58',
      '#30363D',
      '#21262D',
      '#1C2128',
      '#161B22',
      '#0D1117',
    ],
  },
  fontFamily: "'Inter', sans-serif",
  headings: { fontFamily: "'Inter', sans-serif" },
  defaultRadius: 'md',
  other: {
    accentCta: '#2DD4A8',
    highlight: '#E879A8',
    gold: '#F5B544',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    lightBg: '#F8FAFC',
    lightSurface: '#FFFFFF',
    lightText: '#1E293B',
    lightTextSecondary: '#64748B',
    lightBorder: '#E2E8F0',
  },
});
