import { cn } from "@/lib/utils";

type ContainerProps<T extends React.ElementType = "div"> = {
	as?: T;
	className?: string;
	children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function Container<T extends React.ElementType = "div">({
	as,
	className,
	children,
	...props
}: ContainerProps<T>) {
	const Component = as || "div";
	return (
		<Component
			className={cn("mx-auto max-w-[1480px] px-6 md:px-8 lg:px-12", className)}
			{...props}
		>
			{children}
		</Component>
	);
}
