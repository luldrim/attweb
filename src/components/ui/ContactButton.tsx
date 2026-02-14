import Button from "./Button";

type ContactButtonProps = {
	variant?: "primary" | "secondary" | "white" | "glass" | "outline";
	size?: "sm" | "md" | "lg";
	className?: string;
	children: React.ReactNode;
};

export default function ContactButton({
	variant = "primary",
	size = "md",
	className,
	children,
}: ContactButtonProps) {
	return (
		<Button variant={variant} size={size} className={className} href="/request-quote">
			{children}
		</Button>
	);
}
