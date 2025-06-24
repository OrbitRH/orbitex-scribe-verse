
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-muted/30">
          <div className="omie-card p-6 min-h-[calc(100vh-8rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
