import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { AppRole } from '@/types/auth';
import {
  Package,
  Users,
  Building,
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
  ChevronDown,
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
      { title: 'Empresas', href: '/cadastros/empresas' },
      { title: 'Centros de Custo', href: '/cadastros/centros-custo' },
      { title: 'Setores', href: '/cadastros/setores' },
      { title: 'Funções', href: '/cadastros/funcoes' },
      { title: 'Organograma', href: '/cadastros/organograma' },
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
    submenu: [
      { title: 'Colaboradores', href: '/rh/colaboradores' },
      { title: 'Ponto', href: '/rh/ponto' },
      { title: 'Documentos', href: '/rh/documentos' },
      { title: 'Avaliações', href: '/rh/avaliacoes' },
    ],
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
    submenu: [
      { title: 'Empresa', href: '/configuracoes/empresa' },
    ],
  },
];

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { hasRole } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const hasAccess = (item: any) => {
    return item.roles.some((role: AppRole) => hasRole(role));
  };

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isExpanded = (href: string) => expandedItems.includes(href);

  return (
    <div
      className={cn(
        'bg-white border-r border-border transition-all duration-300 shadow-sm',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center hover:bg-muted rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          if (!hasAccess(item)) return null;

          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
                          (item.submenu && item.submenu.some(sub => location.pathname === sub.href));
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isItemExpanded = isExpanded(item.href);

          return (
            <div key={item.href} className="space-y-1">
              <div className="flex items-center">
                <Link to={item.href} className="flex-1">
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start rounded-lg font-medium transition-all duration-200',
                      collapsed ? 'justify-center px-2' : 'px-3',
                      isActive 
                        ? 'bg-primary/10 text-primary border-l-4 border-primary shadow-sm' 
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className={cn('h-5 w-5', !collapsed && 'mr-3')} />
                    {!collapsed && <span>{item.title}</span>}
                  </Button>
                </Link>

                {!collapsed && hasSubmenu && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(item.href)}
                    className="ml-1 p-1 h-8 w-8 hover:bg-muted rounded-md"
                  >
                    <ChevronDown 
                      className={cn(
                        'h-4 w-4 transition-transform',
                        isItemExpanded && 'rotate-180'
                      )} 
                    />
                  </Button>
                )}
              </div>

              {!collapsed && hasSubmenu && (isActive || isItemExpanded) && (
                <div className="ml-8 space-y-1 border-l-2 border-muted pl-4">
                  {item.submenu.map((subItem) => (
                    <Link key={subItem.href} to={subItem.href}>
                      <Button
                        variant={location.pathname === subItem.href ? 'secondary' : 'ghost'}
                        size="sm"
                        className={cn(
                          'w-full justify-start text-sm rounded-md transition-colors',
                          location.pathname === subItem.href
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        )}
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
