import { cn } from "@/lib/utils";

type CardProps = {
	className?: string;
	padding?: "sm" | "md" | "lg";
	hover?: boolean;
	children: React.ReactNode;
};

const paddings = {
	sm: "p-4 md:p-5",
	md: "p-6 md:p-8",
	lg: "p-8 md:p-10",
};

export default function Card({
	className,
	padding = "md",
	hover = false,
	children,
}: CardProps) {
	return (
		<div
			className={cn(
				"bg-white rounded-lg border border-border",
				paddings[padding],
				hover && "transition-transform duration-300 hover:-translate-y-1",
				className,
			)}
		>
			{children}
		</div>
	);
}
