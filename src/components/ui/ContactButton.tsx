"use client";

import Button from "./Button";
import { openContactModal } from "./ContactModal";

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
		<Button variant={variant} size={size} className={className} onClick={openContactModal}>
			{children}
		</Button>
	);
}
