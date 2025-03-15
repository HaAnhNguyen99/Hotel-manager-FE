import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../common/Sidebar/Sidebar";

export function BaseLayouts({ children }: { children: React.ReactNode }) {
  const defaultOpen = false;
  const SIDEBAR_WIDTH = "15rem";
  const SIDEBAR_WIDTH_MOBILE = "18rem";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-background": "#fafafe",
          "--sidebar-foreground": "#504866",
        } as React.CSSProperties
      }>
      <AppSidebar />
      <div className="min-h-screen w-full bg-background">
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
