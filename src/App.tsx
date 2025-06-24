
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Import all pages
import Cadastros from "./pages/Cadastros";
import Produtos from "./pages/cadastros/Produtos";
import Empresas from "./pages/cadastros/Empresas";
import Estoque from "./pages/Estoque";
import PCP from "./pages/PCP";
import Tarefas from "./pages/Tarefas";
import RH from "./pages/RH";
import Colaboradores from "./pages/rh/Colaboradores";
import Ponto from "./pages/rh/Ponto";
import Documentos from "./pages/rh/Documentos";
import Avaliacoes from "./pages/rh/Avaliacoes";
import Financeiro from "./pages/Financeiro";
import Comercial from "./pages/Comercial";
import Relatorios from "./pages/Relatorios";
import Fiscal from "./pages/Fiscal";
import Configuracoes from "./pages/Configuracoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            {/* Dashboard */}
            <Route path="/" element={
              <AuthGuard requireRoles={['admin', 'gestor', 'colaborador', 'rh', 'financeiro']}>
                <Layout>
                  <Dashboard />
                </Layout>
              </AuthGuard>
            } />

            {/* Cadastros */}
            <Route path="/cadastros" element={
              <AuthGuard requireRoles={['admin', 'gestor']}>
                <Layout>
                  <Cadastros />
                </Layout>
              </AuthGuard>
            } />
            <Route path="/cadastros/produtos" element={
              <AuthGuard requireRoles={['admin', 'gestor']}>
                <Layout>
                  <Produtos />
                </Layout>
              </AuthGuard>
            } />
            <Route path="/cadastros/empresas" element={
              <AuthGuard requireRoles={['admin', 'gestor']}>
                <Layout>
                  <Empresas />
                </Layout>
              </AuthGuard>
            } />

            {/* Estoque */}
            <Route path="/estoque" element={
              <AuthGuard requireRoles={['admin', 'gestor', 'colaborador']}>
                <Layout>
                  <Estoque />
                </Layout>
              </AuthGuard>
            } />

            {/* PCP */}
            <Route path="/pcp" element={
              <AuthGuard requireRoles={['admin', 'gestor', 'colaborador']}>
                <Layout>
                  <PCP />
                </Layout>
              </AuthGuard>
            } />

            {/* Tarefas */}
            <Route path="/tarefas" element={
              <AuthGuard requireRoles={['admin', 'gestor', 'colaborador']}>
                <Layout>
                  <Tarefas />
                </Layout>
              </AuthGuard>
            } />

            {/* RH */}
            <Route path="/rh" element={
              <AuthGuard requireRoles={['admin', 'rh', 'gestor']}>
                <Layout>
                  <RH />
                </Layout>
              </AuthGuard>
            } />
            <Route path="/rh/colaboradores" element={
              <AuthGuard requireRoles={['admin', 'rh', 'gestor']}>
                <Layout>
                  <Colaboradores />
                </Layout>
              </AuthGuard>
            } />
            <Route path="/rh/ponto" element={
              <AuthGuard requireRoles={['admin', 'rh', 'gestor']}>
                <Layout>
                  <Ponto />
                </Layout>
              </AuthGuard>
            } />
            <Route path="/rh/documentos" element={
              <AuthGuard requireRoles={['admin', 'rh', 'gestor']}>
                <Layout>
                  <Documentos />
                </Layout>
              </AuthGuard>
            } />
            <Route path="/rh/avaliacoes" element={
              <AuthGuard requireRoles={['admin', 'rh', 'gestor']}>
                <Layout>
                  <Avaliacoes />
                </Layout>
              </AuthGuard>
            } />

            {/* Financeiro */}
            <Route path="/financeiro" element={
              <AuthGuard requireRoles={['admin', 'financeiro', 'gestor']}>
                <Layout>
                  <Financeiro />
                </Layout>
              </AuthGuard>
            } />

            {/* Comercial */}
            <Route path="/comercial" element={
              <AuthGuard requireRoles={['admin', 'gestor']}>
                <Layout>
                  <Comercial />
                </Layout>
              </AuthGuard>
            } />

            {/* Relatórios */}
            <Route path="/relatorios" element={
              <AuthGuard requireRoles={['admin', 'gestor', 'financeiro']}>
                <Layout>
                  <Relatorios />
                </Layout>
              </AuthGuard>
            } />

            {/* Fiscal */}
            <Route path="/fiscal" element={
              <AuthGuard requireRoles={['admin', 'financeiro']}>
                <Layout>
                  <Fiscal />
                </Layout>
              </AuthGuard>
            } />

            {/* Configurações */}
            <Route path="/configuracoes" element={
              <AuthGuard requireRoles={['admin']}>
                <Layout>
                  <Configuracoes />
                </Layout>
              </AuthGuard>
            } />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
