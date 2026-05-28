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
      { detail: [{ loc: "demanda_bruta", msg: "Deve ter no minimo 10 caracteres." }] },
      422,
    );
    expect(msg).toContain("demanda_bruta");
    expect(msg).toContain("no minimo 10");
  });

  it("traduz 404 generico da listagem", () => {
    const msg = formatApiError({ detail: "Not Found" }, 404);
    expect(msg).toContain("Nao foi possivel carregar");
  });

  it("traduz mensagem pydantic em ingles no cliente", () => {
    const msg = formatApiError(
      {
        detail: [
          {
            loc: "body.validacao_painel_documento.score_classificacao",
            msg: "Input should be less than or equal to 10",
          },
        ],
      },
      422,
    );
    expect(msg).toContain("menor ou igual a 10");
  });
});
