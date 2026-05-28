from __future__ import annotations

import re
from typing import Any


def traduzir_msg_pydantic(msg: str, ctx: dict[str, Any] | None = None) -> str:
    ctx = ctx or {}
    if msg == "Field required":
        return "Campo obrigatorio."
    if msg == "Input should be a valid integer":
        return "Informe um numero inteiro valido."
    if msg == "Input should be a valid string":
        return "Informe um texto valido."

    m = re.match(r"String should have at least (\d+) characters?", msg)
    if m:
        return f"Deve ter no minimo {m.group(1)} caracteres."

    m = re.match(r"String should have at most (\d+) characters?", msg)
    if m:
        return f"Deve ter no maximo {m.group(1)} caracteres."

    m = re.match(r"Input should be less than or equal to (\d+)", msg)
    if m:
        return f"Deve ser menor ou igual a {m.group(1)}."

    m = re.match(r"Input should be greater than or equal to (\d+)", msg)
    if m:
        return f"Deve ser maior ou igual a {m.group(1)}."

    if "at least" in msg and "items" in msg:
        m = re.search(r"at least (\d+)", msg)
        if m:
            return f"Informe no minimo {m.group(1)} itens."

    le = ctx.get("le")
    ge = ctx.get("ge")
    if le is not None and "less than or equal" in msg:
        return f"Deve ser menor ou igual a {le}."
    if ge is not None and "greater than or equal" in msg:
        return f"Deve ser maior ou igual a {ge}."

    return msg


def formatar_erros_validacao(errors: list[dict[str, Any]]) -> list[dict[str, str]]:
    itens: list[dict[str, str]] = []
    for err in errors:
        loc = err.get("loc", ())
        caminho = ".".join(str(p) for p in loc if p not in ("body",))
        msg = traduzir_msg_pydantic(str(err.get("msg", "")), err.get("ctx") or {})
        itens.append({"loc": caminho or "campo", "msg": msg})
    return itens
