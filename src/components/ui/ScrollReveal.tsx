"use client";

import { motion, type Variant } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type ScrollRevealProps = {
	children: ReactNode;
	direction?: Direction;
	delay?: number;
	duration?: number;
	distance?: number;
	once?: boolean;
	className?: string;
	as?: "div" | "section" | "header" | "footer" | "article" | "span";
	viewportMargin?: string;
	scale?: boolean;
};

const offsets: Record<Direction, { x: number; y: number }> = {
	up: { x: 0, y: 1 },
	down: { x: 0, y: -1 },
	left: { x: 1, y: 0 },
	right: { x: -1, y: 0 },
	none: { x: 0, y: 0 },
};

export default function ScrollReveal({
	children,
	direction = "up",
	delay = 0,
	duration = 0.7,
	distance = 40,
	once = true,
	className,
	as = "div",
	viewportMargin = "-80px",
	scale = false,
}: ScrollRevealProps) {
	const offset = offsets[direction];

	const hidden: Variant = {
		opacity: 0,
		x: offset.x * distance,
		y: offset.y * distance,
		...(scale ? { scale: 0.95 } : {}),
	};

	const visible: Variant = {
		opacity: 1,
		x: 0,
		y: 0,
		...(scale ? { scale: 1 } : {}),
	};

	const Component = motion.create(as);

	return (
		<Component
			initial={hidden}
			whileInView={visible}
			viewport={{ once, margin: viewportMargin }}
			transition={{
				duration,
				delay,
				ease: [0.25, 0.1, 0.25, 1],
			}}
			className={className}
		>
			{children}
		</Component>
	);
}

export function StaggerContainer({
	children,
	className,
	stagger = 0.1,
	delay = 0,
}: {
	children: ReactNode;
	className?: string;
	stagger?: number;
	delay?: number;
}) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-80px" }}
			transition={{ staggerChildren: stagger, delayChildren: delay }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({
	children,
	className,
	direction = "up",
	distance = 30,
}: {
	children: ReactNode;
	className?: string;
	direction?: Direction;
	distance?: number;
}) {
	const offset = offsets[direction];

	return (
		<motion.div
			variants={{
				hidden: {
					opacity: 0,
					x: offset.x * distance,
					y: offset.y * distance,
				},
				visible: {
					opacity: 1,
					x: 0,
					y: 0,
					transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
				},
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
