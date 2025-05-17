import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function SystemLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#c8faf6] p-4">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <div className="px-3 mx-auto max-w-6xl">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
