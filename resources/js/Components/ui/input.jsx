import * as React from "react"

import { cn } from "@/lib/utils" // Ensure this path is correct for your 'cn' utility

const Input = React.forwardRef(({ className, type, isFocused, ...props }, ref) => { // Added isFocused to destructuring
  // You can add logic here if you want to actually apply focus, e.g.:
  // React.useEffect(() => {
  //   if (isFocused) {
  //     ref.current?.focus();
  //   }
  // }, [isFocused]);

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} // 'isFocused' is now consumed, so it won't be passed to the native input
    />
  )
})
Input.displayName = "Input"

export { Input }