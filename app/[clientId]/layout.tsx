import { PropsWithChildren } from 'react';

import { Footer } from '~/components/ui/footer';
import { SidebarProvider } from '~/components/ui/sidebar';

import { AppSidebar } from '../_components/ui/app-sidebar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-full min-w-0">
        <main className="flex-1 min-w-0 bg-background">
          {children}
          <Footer />
        </main>
      </div>
    </SidebarProvider>
  );
}
