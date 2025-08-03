import { MainNav } from '@/components/main-nav';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { Bot, Video } from 'lucide-react';
import Link from 'next/link';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar
          collapsible="icon"
          className="border-r border-border/50"
          variant="sidebar"
        >
          <div className="flex h-full flex-col">
            <div className="flex h-16 shrink-0 items-center justify-center p-2 group-data-[collapsible=icon]:p-0">
               <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
                  <div className="relative">
                    <Video className="h-8 w-8 text-primary" strokeWidth={1.5} />
                    <Bot className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-sidebar bg-accent p-0.5 text-accent-foreground" />
                  </div>
                  <h1 className="font-headline text-2xl font-bold group-data-[collapsible=icon]:hidden">
                    NeonVid
                  </h1>
               </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
              <MainNav />
            </div>
          </div>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 p-4 backdrop-blur-sm">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1"></div>
            <UserNav />
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
