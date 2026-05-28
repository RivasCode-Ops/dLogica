import { describe, expect, it } from "vitest";
import { formatApiError, parseListInput } from "./client";

describe("parseListInput", () => {
  it("divide por virgula, ponto e virgula ou quebra de linha", () => {
    expect(parseListInput("a, b; c\nd")).toEqual(["a", "b", "c", "d"]);
  });

  it("remove itens vazios", () => {
    expect(parseListInput("a,, ,b")).toEqual(["a", "b"]);
  });
});

describe("formatApiError", () => {
  it("extrai detail string do FastAPI", () => {
    expect(formatApiError({ detail: "demanda_id nao encontrado" }, 400)).toBe(
      "demanda_id nao encontrado",
    );
  });

  it("formata lista de erros de validacao", () => {
    const msg = formatApiError(
      { detail: [{ loc: ["body", "demanda_bruta"], msg: "String should have at least 10 characters" }] },
      422,
    );
    expect(msg).toContain("demanda_bruta");
    expect(msg).toContain("at least 10");
  });
});
