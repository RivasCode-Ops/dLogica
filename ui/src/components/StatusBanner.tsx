type Props = {
  kind: "idle" | "loading" | "success" | "error";
  message: string;
};

export function StatusBanner({ kind, message }: Props) {
  if (kind === "idle" || !message) {
    return null;
  }

  return <div className={`banner banner-${kind}`}>{message}</div>;
}
