import type { ReactNode } from "react";

export default function StatusBanner({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-4">
      <p className="text-[10px] font-semibold tracking-wider text-amber-300">{title}</p>
      <div className="mt-2 text-[11px] leading-6 text-slate-400">{children}</div>
    </div>
  );
}
