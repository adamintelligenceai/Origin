import * as React from "react";
import { cn } from "cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-sm border border-ink-2 bg-folio px-2.5 py-1 text-base text-ink tabular-nums transition-colors outline-none placeholder:text-ink-2 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-ink md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
