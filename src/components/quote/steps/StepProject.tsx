"use client";

import { motion } from "framer-motion";
import { useQuote, type ProjectType } from "../quote-context";
import { QUOTE_PROJECT_TYPES } from "@/lib/constants";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function StepProject() {
	const { state, dispatch } = useQuote();
	const { projectType, surface, location } = state.data;
	const errors = state.errors;

	return (
		<div className="flex flex-col gap-5">
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.05, ease }}
			>
				<h2 className="text-[1.75rem] md:text-[2rem] font-light text-foreground leading-tight tracking-tight">
					Votre projet
				</h2>
				<p className="text-muted text-[0.9375rem] mt-1">
					Quel type de travaux envisagez-vous ?
				</p>
			</motion.div>

			{/* Project type cards */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.1, ease }}
				className="grid grid-cols-2 gap-3"
			>
				{QUOTE_PROJECT_TYPES.map((type, i) => {
					const selected = projectType === type.value;
					return (
						<motion.button
							key={type.value}
							type="button"
							onClick={() =>
								dispatch({
									type: "SET_PROJECT_TYPE",
									value: type.value as ProjectType,
								})
							}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.3,
								delay: 0.12 + i * 0.05,
								ease,
							}}
							className={`relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-colors duration-200 cursor-pointer ${
								selected
									? "border-accent bg-accent/5"
									: "border-black/8 bg-white hover:border-black/15"
							}`}
						>
							<span className="text-[1.25rem] mb-2">{type.icon}</span>
							<span className="text-[0.9375rem] font-medium text-foreground">
								{type.label}
							</span>
							<span className="text-[0.8125rem] text-muted mt-0.5">
								{type.description}
							</span>
						</motion.button>
					);
				})}
			</motion.div>
			{errors.projectType && (
				<p className="text-red-500 text-[0.8125rem] -mt-2">
					{errors.projectType}
				</p>
			)}

			{/* Surface */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.3, ease }}
			>
				<label
					htmlFor="quote-surface"
					className="block text-[0.875rem] font-medium text-foreground mb-2"
				>
					Surface approximative{" "}
					<span className="text-muted font-normal">(facultatif)</span>
				</label>
				<div className="relative">
					<input
						id="quote-surface"
						type="text"
						value={surface}
						onChange={(e) =>
							dispatch({
								type: "SET_FIELD",
								field: "surface",
								value: e.target.value,
							})
						}
						className="w-full px-4 py-3 pr-12 bg-white rounded-lg border border-black/10 text-[0.9375rem] text-foreground placeholder:text-muted/40 outline-none focus:border-foreground/30 transition-colors"
						placeholder="120"
					/>
					<span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-[0.875rem]">
						m²
					</span>
				</div>
			</motion.div>

			{/* Location */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.35, ease }}
			>
				<label
					htmlFor="quote-location"
					className="block text-[0.875rem] font-medium text-foreground mb-2"
				>
					Localisation du projet
				</label>
				<motion.input
					id="quote-location"
					type="text"
					value={location}
					onChange={(e) =>
						dispatch({
							type: "SET_FIELD",
							field: "location",
							value: e.target.value,
						})
					}
					animate={
						errors.location ? { x: [0, -8, 8, -8, 8, -4, 4, 0] } : {}
					}
					transition={{ duration: 0.4 }}
					className={`w-full px-4 py-3 bg-white rounded-lg border text-[0.9375rem] text-foreground placeholder:text-muted/40 outline-none transition-colors ${
						errors.location
							? "border-red-400 focus:border-red-400"
							: "border-black/10 focus:border-foreground/30"
					}`}
					placeholder="Clermont-Ferrand, 63000"
				/>
				{errors.location && (
					<p className="text-red-500 text-[0.8125rem] mt-1.5">
						{errors.location}
					</p>
				)}
			</motion.div>
		</div>
	);
}
