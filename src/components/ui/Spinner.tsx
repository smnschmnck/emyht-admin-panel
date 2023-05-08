import { VariantProps, cva } from "class-variance-authority";

const spinnerVariants = cva(
  "border-blue-600 border-t-transparent rounded-full animate-spin-fast",
  {
    variants: {
      size: {
        default: "w-12 h-12 border-4",
        sm: "w-8 h-8 border-4",
        lg: "w-24 h-24 border-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const Spinner: React.FC<VariantProps<typeof spinnerVariants>> = ({
  size,
}) => <div className={spinnerVariants({ size })} />;
