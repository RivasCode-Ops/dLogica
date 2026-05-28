import { expect, test } from "@playwright/test";
import { seedCasoCompleto } from "./helpers";

test.describe("Wizard dLogica", () => {
  test("home lista casos e abre sessao", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Do caos a uma decisao clara/i })).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: /Sessao guiada/i }),
    ).toBeVisible();
  });

  test("sessao M1 salva e avanca para M2", async ({ page }) => {
    const demandaId = `DLG-PW-${Date.now()}`;
    await page.goto(`/sessao/${demandaId}`);

    await expect(page.getByRole("heading", { name: /O que chegou/i })).toBeVisible();
    await page.locator("textarea").first().fill(
      "Demanda E2E Playwright: priorizar tarefas criticas com rastreabilidade semanal.",
    );
    await page.getByRole("button", { name: /Salvar e continuar/i }).click();

    await expect(page.getByRole("heading", { name: /Separar sinais/i })).toBeVisible({
      timeout: 15_000,
    });
  });

  test("diagnostico exporta markdown", async ({ page, request }) => {
    const demandaId = `DLG-PW-EXP-${Date.now()}`;
    await seedCasoCompleto(request, demandaId);

    await page.goto(`/casos/${encodeURIComponent(demandaId)}`);
    await expect(page.getByText("Diagnostico do caso")).toBeVisible({ timeout: 15_000 });

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /Exportar Markdown/i }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(demandaId);
    expect(download.suggestedFilename()).toMatch(/\.md$/);
  });
});
