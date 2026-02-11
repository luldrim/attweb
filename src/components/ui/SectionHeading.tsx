import { cn } from "@/lib/utils";

type SectionHeadingProps = {
	label?: string;
	title: string;
	description?: string;
	align?: "left" | "center";
	light?: boolean;
	className?: string;
};

export default function SectionHeading({
	label,
	title,
	description,
	align = "center",
	light = false,
	className,
}: SectionHeadingProps) {
	return (
		<div
			className={cn(
				"mb-12 md:mb-16",
				align === "center" && "text-center",
				className,
			)}
		>
			{label && (
				<span
					className={cn(
						"inline-block text-caption uppercase font-semibold tracking-widest mb-4",
						light ? "text-accent" : "text-accent",
					)}
				>
					{label}
				</span>
			)}
			<h2
				className={cn(
					"text-h2 font-semibold",
					light ? "text-white" : "text-foreground",
				)}
			>
				{title}
			</h2>
			{description && (
				<p
					className={cn(
						"mt-4 max-w-2xl text-body-lg",
						align === "center" && "mx-auto",
						light ? "text-white/70" : "text-muted",
					)}
				>
					{description}
				</p>
			)}
		</div>
	);
}
