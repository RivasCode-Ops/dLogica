const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export function formatApiError(data: unknown, status: number): string {
  if (!data || typeof data !== "object") {
    return `Erro HTTP ${status}. Verifique se a API esta ativa em :8000.`;
  }

  if (!("detail" in data)) {
    return `Erro HTTP ${status}.`;
  }

  const detail = (data as { detail: unknown }).detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (item && typeof item === "object" && "msg" in item) {
          const loc =
            "loc" in item && Array.isArray(item.loc) ? item.loc.join(".") : "campo";
          return `${loc}: ${String(item.msg)}`;
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
