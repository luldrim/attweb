"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuote } from "../quote-context";
import { QUOTE_PROJECT_TYPES } from "@/lib/constants";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function StepSuccess() {
	const { state } = useQuote();
	const { data } = state;

	const projectLabel =
		QUOTE_PROJECT_TYPES.find((t) => t.value === data.projectType)?.label ??
		data.projectType;

	return (
		<div className="flex flex-col items-center justify-center flex-1 text-center px-4">
			{/* Checkmark */}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
				className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6"
			>
				<svg
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					className="text-accent"
				>
					<polyline points="20 6 9 17 4 12" />
				</svg>
			</motion.div>

			<motion.h2
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.2, ease }}
				className="text-[1.75rem] md:text-[2rem] font-light text-foreground leading-tight tracking-tight"
			>
				Demande envoyée !
			</motion.h2>
			<motion.p
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.3, ease }}
				className="text-muted text-[0.9375rem] mt-2 max-w-[360px]"
			>
				Merci {data.firstName}, nous reviendrons vers vous sous 24h avec une
				proposition personnalisée.
			</motion.p>

			{/* Recap card */}
			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.4, ease }}
				className="mt-8 w-full max-w-[380px] bg-black/[0.03] rounded-xl p-5 text-left"
			>
				<h3 className="text-[0.8125rem] font-semibold text-foreground uppercase tracking-wide mb-3">
					Récapitulatif
				</h3>
				<div className="space-y-2.5 text-[0.875rem]">
					<div className="flex justify-between">
						<span className="text-muted">Nom</span>
						<span className="text-foreground font-medium">
							{data.firstName} {data.lastName}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted">Email</span>
						<span className="text-foreground font-medium">{data.email}</span>
					</div>
					{data.projectType && (
						<div className="flex justify-between">
							<span className="text-muted">Projet</span>
							<span className="text-foreground font-medium">
								{projectLabel}
							</span>
						</div>
					)}
					{data.surface && (
						<div className="flex justify-between">
							<span className="text-muted">Surface</span>
							<span className="text-foreground font-medium">
								{data.surface} m²
							</span>
						</div>
					)}
					{data.location && (
						<div className="flex justify-between">
							<span className="text-muted">Localisation</span>
							<span className="text-foreground font-medium">
								{data.location}
							</span>
						</div>
					)}
				</div>
			</motion.div>

			{/* Back to home */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.55, ease }}
				className="mt-8"
			>
				<Link
					href="/"
					className="group inline-flex items-center gap-2 px-8 py-3 bg-foreground text-white rounded-full text-[0.9375rem] font-medium overflow-hidden hover:bg-foreground/90 transition-colors duration-200"
				>
					<span className="relative block overflow-hidden">
						<span className="block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
							Retour à l&apos;accueil
						</span>
						<span
							className="absolute top-full left-0 block transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full"
							aria-hidden="true"
						>
							Retour à l&apos;accueil
						</span>
					</span>
				</Link>
			</motion.div>
		</div>
	);
}
