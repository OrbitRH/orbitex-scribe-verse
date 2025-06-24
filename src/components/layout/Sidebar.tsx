
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { AppRole } from '@/types/auth';
import {
  Package,
  Users,
  Warehouse,
  ClipboardList,
  Clock,
  DollarSign,
  ShoppingCart,
  BarChart3,
  FileText,
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: Home,
    href: '/',
    roles: ['admin', 'gestor', 'colaborador', 'rh', 'financeiro'] as AppRole[],
  },
  {
    title: 'Cadastros',
    icon: Package,
    href: '/cadastros',
    roles: ['admin', 'gestor'] as AppRole[],
    submenu: [
      { title: 'Produtos', href: '/cadastros/produtos' },
      { title: 'Colaboradores', href: '/cadastros/colaboradores' },
      { title: 'Fornecedores', href: '/cadastros/fornecedores' },
      { title: 'Clientes', href: '/cadastros/clientes' },
    ],
  },
  {
    title: 'Estoque',
    icon: Warehouse,
    href: '/estoque',
    roles: ['admin', 'gestor', 'colaborador'] as AppRole[],
  },
  {
    title: 'PCP',
    icon: ClipboardList,
    href: '/pcp',
    roles: ['admin', 'gestor', 'colaborador'] as AppRole[],
  },
  {
    title: 'Tarefas',
    icon: Clock,
    href: '/tarefas',
    roles: ['admin', 'gestor', 'colaborador'] as AppRole[],
  },
  {
    title: 'RH',
    icon: Users,
    href: '/rh',
    roles: ['admin', 'rh', 'gestor'] as AppRole[],
  },
  {
    title: 'Financeiro',
    icon: DollarSign,
    href: '/financeiro',
    roles: ['admin', 'financeiro', 'gestor'] as AppRole[],
  },
  {
    title: 'Comercial',
    icon: ShoppingCart,
    href: '/comercial',
    roles: ['admin', 'gestor'] as AppRole[],
  },
  {
    title: 'Relatórios',
    icon: BarChart3,
    href: '/relatorios',
    roles: ['admin', 'gestor', 'financeiro'] as AppRole[],
  },
  {
    title: 'Fiscal',
    icon: FileText,
    href: '/fiscal',
    roles: ['admin', 'financeiro'] as AppRole[],
  },
  {
    title: 'Configurações',
    icon: Settings,
    href: '/configuracoes',
    roles: ['admin'] as AppRole[],
  },
];

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { hasRole } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const hasAccess = (item: any) => {
    return item.roles.some((role: AppRole) => hasRole(role));
  };

  return (
    <div
      className={cn(
        'bg-white border-r border-gray-200 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="p-4 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          if (!hasAccess(item)) return null;

          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
                          (item.submenu && item.submenu.some(sub => location.pathname === sub.href));

          return (
            <div key={item.href}>
              <Link to={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    collapsed && 'justify-center px-2'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">{item.title}</span>}
                </Button>
              </Link>

              {!collapsed && item.submenu && isActive && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link key={subItem.href} to={subItem.href}>
                      <Button
                        variant={location.pathname === subItem.href ? 'secondary' : 'ghost'}
                        size="sm"
                        className="w-full justify-start"
                      >
                        {subItem.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
