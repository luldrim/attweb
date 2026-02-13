"use client";

import { openContactModal } from "./ContactModal";

export default function ContactButton({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<button onClick={openContactModal} className={className}>
			{children}
		</button>
	);
}
