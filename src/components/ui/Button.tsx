import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-clinical text-white shadow-sm hover:bg-blue-800 focus-visible:outline-clinical",
  secondary:
    "border border-slate-300 bg-white text-ink hover:border-clinical hover:text-clinical",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-ink",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

function classNames(variant: Variant, size: Size, extra?: string) {
  return [base, variantClasses[variant], sizeClasses[size], extra].filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classNames(variant, size, className)} {...rest}>
      {children}
      {withArrow && <ArrowRight className="h-4 w-4" aria-hidden />}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={classNames(variant, size, className)} {...rest}>
      {children}
      {withArrow && <ArrowRight className="h-4 w-4" aria-hidden />}
    </a>
  );
}
