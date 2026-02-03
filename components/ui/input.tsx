import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // base
        "h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base md:text-sm shadow-xs outline-none transition-[color,box-shadow]",

        // 👇 changes you asked for
        "border-muted-foreground text-white placeholder:text-muted-foreground",

        // selection + background
        "selection:bg-primary selection:text-primary-foreground dark:bg-input/30",

        // focus
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",

        // file input + disabled
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        // invalid
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        className,
      )}
      {...props}
    />
  );
}

export { Input };
