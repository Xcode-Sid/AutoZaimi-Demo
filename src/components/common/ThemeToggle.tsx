import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleToggle = () => {
    toggleColorScheme();
    localStorage.setItem('az-color-scheme', colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon
      variant="subtle"
      size="lg"
      onClick={handleToggle}
      aria-label="Toggle color scheme"
    >
      {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
    </ActionIcon>
  );
}
