import { createTheme, type MantineColorsTuple } from '@mantine/core';

const purple: MantineColorsTuple = [
  '#f0eaff',
  '#ddd0f5',
  '#bea0e8',
  '#9e6edb',
  '#8245d0',
  '#7028c9',
  '#6535A0',
  '#563090',
  '#4a2a80',
  '#3a1e70',
];

const teal: MantineColorsTuple = [
  '#e0f7f4',
  '#b3ebe5',
  '#80ded4',
  '#4dd1c3',
  '#26c6b6',
  '#00BFA5',
  '#00A896',
  '#009688',
  '#00897B',
  '#00695C',
];

const magenta: MantineColorsTuple = [
  '#fce4f2',
  '#f8bbd9',
  '#f48fbe',
  '#f062a2',
  '#ec3e8b',
  '#E91E8C',
  '#d41a7e',
  '#be1670',
  '#a71262',
  '#800d4c',
];

const gold: MantineColorsTuple = [
  '#fef7e8',
  '#fdecc5',
  '#fce09e',
  '#fbd477',
  '#F5A623',
  '#e8991a',
  '#d08a17',
  '#b87a14',
  '#9f6b11',
  '#7a520d',
];

export const theme = createTheme({
  primaryColor: 'purple',
  colors: {
    purple,
    teal,
    magenta,
    gold,
    dark: [
      '#C8CCD4',
      '#A8AEB8',
      '#8B929E',
      '#5C6370',
      '#3A4150',
      '#2A3244',
      '#1E2738',
      '#152030',
      '#0F1925',
      '#0A111C',
    ],
  },
  fontFamily: "'Inter', sans-serif",
  headings: { fontFamily: "'Inter', sans-serif" },
  defaultRadius: 'md',
  other: {
    accentCta: '#00BFA5',
    highlight: '#E91E8C',
    gold: '#F5A623',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
  },
});
