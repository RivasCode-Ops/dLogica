const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

function traduzirMsgValidacao(msg: string): string {
  const map: [RegExp, string][] = [
    [/Input should be less than or equal to (\d+)/i, "Deve ser menor ou igual a $1."],
    [/Input should be greater than or equal to (\d+)/i, "Deve ser maior ou igual a $1."],
    [/String should have at least (\d+) characters?/i, "Deve ter no minimo $1 caracteres."],
    [/Field required/i, "Campo obrigatorio."],
  ];
  for (const [re, tpl] of map) {
    const m = msg.match(re);
    if (m) {
      return tpl.replace("$1", m[1] ?? "");
    }
  }
  return msg;
}

export function formatApiError(data: unknown, status: number): string {
  if (!data || typeof data !== "object") {
    if (status === 404) {
      return "Nao foi possivel acessar a API. Inicie com .\\start-fase3.ps1 (API em :8000) ou reinicie o uvicorn na raiz do repo.";
    }
    return `Erro HTTP ${status}. Verifique se a API esta ativa em :8000.`;
  }

  if (!("detail" in data)) {
    if (status === 404) {
      return "Endpoint nao encontrado. Reinicie a API na porta 8000 com a versao atual (rotas GET /api/v1/demandas).";
    }
    return `Erro HTTP ${status}.`;
  }

  const detail = (data as { detail: unknown }).detail;

  if (typeof detail === "string") {
    if (status === 404 && (detail === "Not Found" || detail === "demanda_id nao encontrado")) {
      return detail === "demanda_id nao encontrado"
        ? "Caso nao encontrado. Registre a demanda no M1 antes das demais etapas."
        : "Nao foi possivel carregar os casos. Verifique se a API esta ativa (porta 8000) e atualizada.";
    }
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (item && typeof item === "object" && "msg" in item) {
          const loc =
            "loc" in item && typeof item.loc === "string"
              ? item.loc
              : "loc" in item && Array.isArray(item.loc)
                ? item.loc.join(".")
                : "campo";
          const raw = String(item.msg);
          return `${loc}: ${traduzirMsgValidacao(raw)}`;
        }
        return JSON.stringify(item);
      })
      .join(" | ");
  }

  return JSON.stringify(detail);
}

export async function getHealth(): Promise<{ status: string }> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) {
    throw new Error(`health check falhou (${res.status})`);
  }
  return res.json();
}

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(formatApiError(data, res.status));
  }

  return data as T;
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(formatApiError(data, res.status));
  }

  return data as T;
}

export function parseListInput(value: string): string[] {
  return value
    .split(/[\n,;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function nowIso(): string {
  return new Date().toISOString();
}
