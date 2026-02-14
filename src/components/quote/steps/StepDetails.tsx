"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useQuote } from "../quote-context";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function FileUploadZone({
	label,
	field,
	accept,
	index,
}: {
	label: string;
	field: "plans" | "photos";
	accept: string;
	index: number;
}) {
	const { state, dispatch } = useQuote();
	const inputRef = useRef<HTMLInputElement>(null);
	const [dragOver, setDragOver] = useState(false);
	const files = state.data[field];

	const handleFiles = useCallback(
		(fileList: FileList | null) => {
			if (!fileList) return;
			const all = Array.from(fileList);
			const valid = all.filter((f) => f.size <= MAX_FILE_SIZE);
			const rejected = all.length - valid.length;
			if (rejected > 0) {
				toast.warning(
					`${rejected} fichier${rejected > 1 ? "s" : ""} ignoré${rejected > 1 ? "s" : ""} (max 5 Mo par fichier)`
				);
			}
			if (valid.length > 0) {
				dispatch({ type: "ADD_FILES", field, files: valid });
			}
		},
		[dispatch, field]
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.15 + index * 0.05, ease }}
		>
			<label className="block text-[0.875rem] font-medium text-foreground mb-2">
				{label}{" "}
				<span className="text-muted font-normal">(facultatif)</span>
			</label>

			{/* Drop zone */}
			<button
				type="button"
				onClick={() => inputRef.current?.click()}
				onDragOver={(e) => {
					e.preventDefault();
					setDragOver(true);
				}}
				onDragLeave={() => setDragOver(false)}
				onDrop={(e) => {
					e.preventDefault();
					setDragOver(false);
					handleFiles(e.dataTransfer.files);
				}}
				className={`w-full py-6 px-4 border-2 border-dashed rounded-xl flex flex-col items-center gap-2 transition-colors duration-200 cursor-pointer ${
					dragOver
						? "border-accent bg-accent/5"
						: "border-black/10 bg-white hover:border-black/20"
				}`}
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-muted"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<polyline points="17 8 12 3 7 8" />
					<line x1="12" y1="3" x2="12" y2="15" />
				</svg>
				<span className="text-[0.875rem] text-muted">
					Cliquez ou déposez vos fichiers
				</span>
			</button>

			<input
				ref={inputRef}
				type="file"
				accept={accept}
				multiple
				onChange={(e) => handleFiles(e.target.files)}
				className="hidden"
			/>

			{/* File previews */}
			{files.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-3">
					{files.map((file, i) => (
						<div
							key={`${file.name}-${i}`}
							className="relative group"
						>
							{file.type.startsWith("image/") ? (
								<FileImagePreview file={file} />
							) : (
								<div className="w-16 h-16 rounded-lg bg-black/5 flex items-center justify-center">
									<span className="text-[0.6875rem] text-muted text-center leading-tight px-1 truncate max-w-full">
										{file.name.split(".").pop()?.toUpperCase()}
									</span>
								</div>
							)}
							<button
								type="button"
								onClick={() =>
									dispatch({ type: "REMOVE_FILE", field, index: i })
								}
								className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-foreground text-white rounded-full text-[0.6875rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
							>
								×
							</button>
						</div>
					))}
				</div>
			)}
		</motion.div>
	);
}

function FileImagePreview({ file }: { file: File }) {
	const [url] = useState(() => URL.createObjectURL(file));
	return (
		<Image
			src={url}
			alt={file.name}
			width={64}
			height={64}
			className="w-16 h-16 rounded-lg object-cover"
			unoptimized
		/>
	);
}

export default function StepDetails() {
	const { state, dispatch } = useQuote();

	return (
		<div className="flex flex-col gap-5">
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.05, ease }}
			>
				<h2 className="text-[1.75rem] md:text-[2rem] font-light text-foreground leading-tight tracking-tight">
					Détails du projet
				</h2>
				<p className="text-muted text-[0.9375rem] mt-1">
					Toutes ces informations sont facultatives.
				</p>
			</motion.div>

			{/* Description */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.1, ease }}
			>
				<label
					htmlFor="quote-description"
					className="block text-[0.875rem] font-medium text-foreground mb-2"
				>
					Description du projet{" "}
					<span className="text-muted font-normal">(facultatif)</span>
				</label>
				<textarea
					id="quote-description"
					rows={4}
					value={state.data.description}
					onChange={(e) =>
						dispatch({
							type: "SET_FIELD",
							field: "description",
							value: e.target.value,
						})
					}
					className="w-full px-4 py-3 bg-white rounded-lg border border-black/10 text-[0.9375rem] text-foreground placeholder:text-muted/40 outline-none focus:border-foreground/30 transition-colors resize-none"
					placeholder="Décrivez votre projet, vos attentes, vos contraintes..."
				/>
			</motion.div>

			{/* File uploads */}
			<FileUploadZone
				label="Plans ou croquis"
				field="plans"
				accept=".pdf,.jpg,.jpeg,.png,.dwg"
				index={1}
			/>
			<FileUploadZone
				label="Photos du site"
				field="photos"
				accept=".jpg,.jpeg,.png,.webp,.heic"
				index={2}
			/>
		</div>
	);
}
