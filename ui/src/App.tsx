import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DemandaProvider } from "./context/DemandaContext";
import { CasoDetalhePage } from "./pages/CasoDetalhePage";
import { HomePage } from "./pages/HomePage";
import { SessaoWizardPage } from "./pages/SessaoWizardPage";
import { Modulo1Page } from "./pages/Modulo1Page";
import { Modulo2Page } from "./pages/Modulo2Page";
import { Modulo3Page } from "./pages/Modulo3Page";
import { Modulo4Page } from "./pages/Modulo4Page";
import { Modulo5Page } from "./pages/Modulo5Page";

export function App() {
  return (
    <DemandaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/sessao" element={<SessaoWizardPage />} />
          <Route path="/sessao/:demandaId" element={<SessaoWizardPage />} />
          <Route path="/casos/:demandaId" element={<CasoDetalhePage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="modulo1" element={<Modulo1Page />} />
            <Route path="modulo2" element={<Modulo2Page />} />
            <Route path="modulo3" element={<Modulo3Page />} />
            <Route path="modulo4" element={<Modulo4Page />} />
            <Route path="modulo5" element={<Modulo5Page />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DemandaProvider>
  );
}
