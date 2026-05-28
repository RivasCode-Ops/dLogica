import { WIZARD_STEPS, type WizardStepId } from "./types";

type Props = {
  activeIndex: number;
  completedThrough: number;
  onSelect: (index: number) => void;
};

export function WizardStepper({ activeIndex, completedThrough, onSelect }: Props) {
  return (
    <nav className="wizard-stepper" aria-label="Progresso da sessao">
      {WIZARD_STEPS.map((step, index) => {
        const done = index < completedThrough;
        const current = index === activeIndex;
        const locked = index > completedThrough;
        const state = done ? "done" : current ? "current" : locked ? "locked" : "upcoming";

        return (
          <button
            key={step.id}
            type="button"
            className={`wizard-step wizard-step-${state}`}
            disabled={locked}
            onClick={() => onSelect(index)}
          >
            <span className="wizard-step-num">{index + 1}</span>
            <span className="wizard-step-text">
              <strong>{step.title}</strong>
              <small>{step.subtitle}</small>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export function moduloFromIndex(index: number): WizardStepId {
  return WIZARD_STEPS[Math.max(0, Math.min(index, WIZARD_STEPS.length - 1))].id;
}
