import { Outlet } from 'react-router-dom';
import { AppShell, Box } from '@mantine/core';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { AdBanner } from '../components/common/AdBanner';

export function PublicLayout() {
  return (
    <AppShell header={{ height: 70 }}>
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <AdBanner position="top" />
        <Box mih="calc(100vh - 70px)">
          <Outlet />
        </Box>
        <AdBanner position="bottom" />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
