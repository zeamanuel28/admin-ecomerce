import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label" // Dependency: @radix-ui/react-label
import { cva } from "class-variance-authority"; // Dependency: class-variance-authority

import { cn } from "@/lib/utils" // Ensure this path is correct for your 'cn' utility

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }