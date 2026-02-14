"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useQuote } from "../quote-context";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function Field({
	label,
	id,
	field,
	type = "text",
	placeholder,
	index,
}: {
	label: string;
	id: string;
	field: string;
	type?: string;
	placeholder: string;
	index: number;
}) {
	const { state, dispatch } = useQuote();
	const value = state.data[field as keyof typeof state.data] as string;
	const error = state.errors[field];

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.1 + index * 0.05, ease }}
		>
			<label
				htmlFor={id}
				className="block text-[0.875rem] font-medium text-foreground mb-2"
			>
				{label}
			</label>
			<motion.input
				id={id}
				name={field}
				type={type}
				value={value}
				onChange={(e) =>
					dispatch({
						type: "SET_FIELD",
						field: field as keyof typeof state.data,
						value: e.target.value,
					})
				}
				animate={error ? { x: [0, -8, 8, -8, 8, -4, 4, 0] } : {}}
				transition={{ duration: 0.4 }}
				className={`w-full px-4 py-3 bg-white rounded-lg border text-[0.9375rem] text-foreground placeholder:text-muted/40 outline-none transition-colors ${
					error
						? "border-red-400 focus:border-red-400"
						: "border-black/10 focus:border-foreground/30"
				}`}
				placeholder={placeholder}
			/>
			{error && (
				<p className="text-red-500 text-[0.8125rem] mt-1.5">{error}</p>
			)}
		</motion.div>
	);
}

export default function StepIdentity() {
	const { state, dispatch } = useQuote();
	const { clientType } = state.data;
	const isPro = clientType === "professionnel";

	return (
		<div className="flex flex-col gap-5">
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.05, ease }}
			>
				<h2 className="text-[1.75rem] md:text-[2rem] font-light text-foreground leading-tight tracking-tight">
					Qui êtes-vous ?
				</h2>
				<p className="text-muted text-[0.9375rem] mt-1">
					Commençons par faire connaissance.
				</p>
			</motion.div>

			{/* Client type toggle */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.1, ease }}
				className="relative flex bg-black/5 rounded-lg p-1"
			>
				{(["particulier", "professionnel"] as const).map((type) => (
					<button
						key={type}
						type="button"
						onClick={() => dispatch({ type: "SET_CLIENT_TYPE", value: type })}
						className={`relative z-10 flex-1 py-2.5 text-[0.875rem] font-medium rounded-md transition-colors duration-200 cursor-pointer ${
							clientType === type ? "text-foreground" : "text-muted"
						}`}
					>
						{type === "particulier" ? "Particulier" : "Professionnel"}
						{clientType === type && (
							<motion.div
								layoutId="clientType"
								className="absolute inset-0 bg-white rounded-md shadow-sm -z-10"
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
							/>
						)}
					</button>
				))}
			</motion.div>

			{/* Company name (conditional) */}
			<AnimatePresence>
				{isPro && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease }}
						className="overflow-hidden"
					>
						<Field
							label="Nom de l'entreprise"
							id="quote-company"
							field="companyName"
							placeholder="Ma Société SARL"
							index={0}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Field
					label="Prénom"
					id="quote-firstName"
					field="firstName"
					placeholder="Jean"
					index={1}
				/>
				<Field
					label="Nom"
					id="quote-lastName"
					field="lastName"
					placeholder="Dupont"
					index={2}
				/>
			</div>

			<Field
				label="Téléphone"
				id="quote-phone"
				field="phone"
				type="tel"
				placeholder="06 00 00 00 00"
				index={3}
			/>
			<Field
				label="Email"
				id="quote-email"
				field="email"
				type="email"
				placeholder="jean@exemple.fr"
				index={4}
			/>

			{/* RGPD checkbox */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.35, ease }}
			>
				<label className="flex items-start gap-3 cursor-pointer group">
					<span className="relative mt-0.5 flex-shrink-0">
						<input
							type="checkbox"
							checked={state.data.rgpdAccepted}
							onChange={() => dispatch({ type: "TOGGLE_RGPD" })}
							className="peer sr-only"
						/>
						<span
							className={`block w-[18px] h-[18px] rounded border-2 transition-colors duration-200 ${
								state.data.rgpdAccepted
									? "bg-foreground border-foreground"
									: state.errors.rgpdAccepted
										? "border-red-400"
										: "border-black/20 group-hover:border-black/40"
							}`}
						>
							{state.data.rgpdAccepted && (
								<svg
									viewBox="0 0 12 12"
									fill="none"
									stroke="white"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-full h-full p-[1px]"
								>
									<polyline points="2 6 5 9 10 3" />
								</svg>
							)}
						</span>
					</span>
					<span className="text-[0.8125rem] text-muted leading-snug">
						J&apos;accepte que mes données soient traitées dans le cadre de ma
						demande de devis conformément à la{" "}
						<a
							href="#"
							className="text-foreground underline underline-offset-2 decoration-1 hover:text-foreground/70 transition-colors"
							onClick={(e) => e.stopPropagation()}
						>
							politique de confidentialité
						</a>
						.
					</span>
				</label>
				{state.errors.rgpdAccepted && (
					<p className="text-red-500 text-[0.8125rem] mt-1.5 ml-[30px]">
						{state.errors.rgpdAccepted}
					</p>
				)}
			</motion.div>
		</div>
	);
}
