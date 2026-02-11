import { cn } from "@/lib/utils";

type ButtonProps = {
	variant?: "primary" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
	href?: string;
	className?: string;
	children: React.ReactNode;
} & (
	| React.AnchorHTMLAttributes<HTMLAnchorElement>
	| React.ButtonHTMLAttributes<HTMLButtonElement>
);

const variants = {
	primary:
		"bg-accent text-white hover:bg-accent-hover",
	secondary:
		"bg-foreground text-white hover:bg-foreground/90",
	outline:
		"bg-transparent text-white border border-white/30 hover:bg-white/10",
};

const sizes = {
	sm: "px-5 py-2.5 text-small",
	md: "px-7 py-3 text-body",
	lg: "px-9 py-4 text-body-lg",
};

export default function Button({
	variant = "primary",
	size = "md",
	href,
	className,
	children,
	...props
}: ButtonProps) {
	const classes = cn(
		"inline-flex items-center justify-center font-medium rounded-pill transition-colors duration-200",
		variants[variant],
		sizes[size],
		className,
	);

	if (href) {
		return (
			<a
				href={href}
				className={classes}
				{...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
			>
				{children}
			</a>
		);
	}

	return (
		<button
			className={classes}
			{...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{children}
		</button>
	);
}
