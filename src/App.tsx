
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Layout } from "@/components/layout/Layout";

// Pages
import Dashboard from "@/pages/Dashboard";
import Cadastros from "@/pages/Cadastros";
import Produtos from "@/pages/cadastros/Produtos";
import Empresas from "@/pages/cadastros/Empresas";
import CentrosCusto from "@/pages/cadastros/CentrosCusto";
import Funcoes from "@/pages/cadastros/Funcoes";
import Setores from "@/pages/cadastros/Setores";
import Organograma from "@/pages/cadastros/Organograma";
import RH from "@/pages/RH";
import Colaboradores from "@/pages/rh/Colaboradores";
import Beneficios from "@/pages/rh/Beneficios";
import Convenios from "@/pages/rh/Convenios";
import Ponto from "@/pages/rh/Ponto";
import Documentos from "@/pages/rh/Documentos";
import Avaliacoes from "@/pages/rh/Avaliacoes";
import Comercial from "@/pages/Comercial";
import Estoque from "@/pages/Estoque";
import PCP from "@/pages/PCP";
import Financeiro from "@/pages/Financeiro";
import Fiscal from "@/pages/Fiscal";
import Relatorios from "@/pages/Relatorios";
import Tarefas from "@/pages/Tarefas";
import Configuracoes from "@/pages/Configuracoes";
import EmpresaConfig from "@/pages/configuracoes/Empresa";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard><Layout /></AuthGuard>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "cadastros", element: <Cadastros /> },
      { path: "cadastros/produtos", element: <Produtos /> },
      { path: "cadastros/empresas", element: <Empresas /> },
      { path: "cadastros/centros-custo", element: <CentrosCusto /> },
      { path: "cadastros/funcoes", element: <Funcoes /> },
      { path: "cadastros/setores", element: <Setores /> },
      { path: "cadastros/organograma", element: <Organograma /> },
      { path: "rh", element: <RH /> },
      { path: "rh/colaboradores", element: <Colaboradores /> },
      { path: "rh/beneficios", element: <Beneficios /> },
      { path: "rh/convenios", element: <Convenios /> },
      { path: "rh/ponto", element: <Ponto /> },
      { path: "rh/documentos", element: <Documentos /> },
      { path: "rh/avaliacoes", element: <Avaliacoes /> },
      { path: "comercial", element: <Comercial /> },
      { path: "estoque", element: <Estoque /> },
      { path: "pcp", element: <PCP /> },
      { path: "financeiro", element: <Financeiro /> },
      { path: "fiscal", element: <Fiscal /> },
      { path: "relatorios", element: <Relatorios /> },
      { path: "tarefas", element: <Tarefas /> },
      { path: "configuracoes", element: <Configuracoes /> },
      { path: "configuracoes/empresa", element: <EmpresaConfig /> },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
