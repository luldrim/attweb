import { cn } from "@/lib/utils";

type ButtonProps = {
	variant?: "primary" | "secondary" | "white" | "glass" | "outline";
	size?: "sm" | "md" | "lg";
	href?: string;
	className?: string;
	children: React.ReactNode;
} & (
	| React.AnchorHTMLAttributes<HTMLAnchorElement>
	| React.ButtonHTMLAttributes<HTMLButtonElement>
);

const variants = {
	primary: "bg-accent text-white hover:bg-accent-hover",
	secondary: "bg-foreground text-white hover:bg-foreground/90",
	white: "bg-white text-foreground hover:bg-white/90",
	glass: "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20",
	outline: "bg-transparent text-white border border-white/30 hover:bg-white/10",
};

const sizes = {
	sm: "px-6 py-2.5 text-[0.875rem]",
	md: "px-7 py-3 text-[0.9375rem]",
	lg: "px-8 py-3.5 text-[0.9375rem]",
};

function TextSlide({ children }: { children: React.ReactNode }) {
	return (
		<span className="relative block overflow-hidden">
			<span className="block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
				{children}
			</span>
			<span
				className="absolute top-full left-0 block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full"
				aria-hidden="true"
			>
				{children}
			</span>
		</span>
	);
}

export default function Button({
	variant = "primary",
	size = "md",
	href,
	className,
	children,
	...props
}: ButtonProps) {
	const classes = cn(
		"group inline-flex items-center justify-center font-medium rounded-full overflow-hidden transition-colors duration-200 cursor-pointer",
		variants[variant],
		sizes[size],
		className,
	);

	const content = <TextSlide>{children}</TextSlide>;

	if (href) {
		return (
			<a
				href={href}
				className={classes}
				{...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
			>
				{content}
			</a>
		);
	}

	return (
		<button
			className={classes}
			{...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{content}
		</button>
	);
}
