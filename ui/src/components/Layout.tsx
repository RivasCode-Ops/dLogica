import { Link, NavLink, Outlet } from "react-router-dom";
import { useDemandaId } from "../context/DemandaContext";
import { FormField } from "./FormField";

const links = [
  { to: "/modulo1", label: "M1 Demanda" },
  { to: "/modulo2", label: "M2 Triagem" },
  { to: "/modulo3", label: "M3 Decisao" },
  { to: "/modulo4", label: "M4 Briefing" },
  { to: "/modulo5", label: "M5 Auditoria" },
];

export function Layout() {
  const { demandaId, setDemandaId } = useDemandaId();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">dLogica</p>
          <h1>Decisoes estruturadas</h1>
        </div>
        <Link className="home-link" to="/">
          Casos
        </Link>
      </header>

      <aside className="app-sidebar">
        <FormField label="demanda_id ativa" hint="Compartilhada entre modulos">
          <input
            value={demandaId}
            onChange={(e) => setDemandaId(e.target.value)}
            placeholder="DLG-UI-001"
          />
        </FormField>

        <Link className="nav-link sessao-link" to={`/sessao/${encodeURIComponent(demandaId)}`}>
          Sessao guiada (wizard)
        </Link>

        <nav className="module-nav">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
