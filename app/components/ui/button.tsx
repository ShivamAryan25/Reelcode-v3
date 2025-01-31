import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

const buttonVariants = cva(
  {
    base: "relative inline-flex items-center justify-center overflow-hidden rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/80",
        secondary: "bg-secondary text-white hover:bg-secondary/80",
        destructive: "bg-destructive text-white hover:bg-destructive/80",
        outline: "border border-zinc-700 text-white hover:bg-zinc-800",
        ghost: "hover:bg-zinc-800 text-white",
      },
      size: {
        default: "h-10 w-32 px-4 py-2",
        sm: "h-9 w-28 px-3 py-1.5 text-xs",
        lg: "h-11 w-40 px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
  {
    compoundVariants: [
      {
        variant: "outline",
        size: "sm",
        className: "h-8 px-2 py-1",
      },
      {
        variant: "outline",
        size: "lg",
        className: "h-12 px-5 py-3",
      },
    ],
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

