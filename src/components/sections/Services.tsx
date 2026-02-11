"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";

const ease = [0.25, 0.1, 0.25, 1] as const;

function DotsDecor() {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white/40">
			<circle cx="6" cy="6" r="3" />
			<circle cx="18" cy="6" r="3" />
			<circle cx="6" cy="18" r="3" />
			<circle cx="18" cy="18" r="3" />
		</svg>
	);
}

export default function Services() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section id="services" className="px-2.5 md:px-3">
			{/* Dark card with rounded corners */}
			<div className="bg-foreground rounded-[20px] md:rounded-[24px] py-16 md:py-24 px-6 md:px-10 lg:px-16">
				<div className="max-w-[1480px] mx-auto">
					{/* Heading */}
					<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-14 md:mb-20">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.7, ease }}
						>
							<h2 className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light text-white leading-[1.1] tracking-tight">
								Notre expertise
							</h2>
							<p className="text-[0.9375rem] text-white/50 leading-relaxed mt-4 max-w-[480px]">
								Un savoir-faire complet en travaux tous corps d&apos;état — chaque prestation est pensée pour la qualité, la durabilité et le respect de vos attentes.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7, delay: 0.3, ease }}
							className="flex-shrink-0 hidden lg:block"
						>
							<DotsDecor />
						</motion.div>
					</div>

					{/* Stacked service rows */}
					<div className="flex flex-col">
						{SERVICES.map((service, index) => {
							const isOpen = openIndex === index;

							return (
								<motion.div
									key={service.number}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-50px" }}
									transition={{ duration: 0.5, delay: index * 0.08, ease }}
									className="border-t border-white/10 last:border-b"
								>
									{/* Row header — always visible */}
									<button
										onClick={() => setOpenIndex(isOpen ? null : index)}
										className="w-full flex items-center gap-4 md:gap-8 py-6 md:py-8 text-left group cursor-pointer"
									>
										{/* Number */}
										<span className="text-[0.9375rem] text-white/50 flex-shrink-0 w-8">
											{service.number}
										</span>

										{/* Thumbnail — landscape */}
										<div className="relative w-24 h-16 md:w-28 md:h-[4.5rem] rounded-lg overflow-hidden flex-shrink-0">
											<Image
												src={service.image}
												alt={service.title}
												fill
												className="object-cover"
												sizes="112px"
											/>
										</div>

										{/* Title + subtitle */}
										<div className="flex-1 min-w-0">
											<h4 className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-medium text-white leading-tight">
												{service.title}
											</h4>
											<p className="text-[0.875rem] md:text-[0.9375rem] text-white/50 mt-1">
												{service.subtitle}
											</p>
										</div>

										{/* Toggle button */}
										<motion.div
											animate={{ rotate: isOpen ? 45 : 0 }}
											transition={{ duration: 0.3, ease }}
											className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
												isOpen
													? "bg-white text-foreground"
													: "bg-white/10 text-white group-hover:bg-white/20"
											}`}
										>
											<svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor">
												<path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
											</svg>
										</motion.div>
									</button>

									{/* Expandable content */}
									<motion.div
										initial={false}
										animate={{
											height: isOpen ? "auto" : 0,
											opacity: isOpen ? 1 : 0,
										}}
										transition={{ duration: 0.4, ease }}
										className="overflow-hidden"
									>
										<div className="pb-8 pl-12 md:pl-[9rem] pr-14 md:pr-20">
											{/* Stat */}
											<div className="flex items-baseline gap-3 mb-4">
												<span className="text-[2rem] md:text-[2.5rem] font-light text-white leading-none tracking-tight">
													{service.stat}
												</span>
												<span className="text-[0.9375rem] text-white">
													{service.statLabel}
												</span>
											</div>
											{/* Description */}
											<p className="text-[0.9375rem] text-white/50 leading-relaxed max-w-[600px] mb-6">
												{service.description}
											</p>
											{/* CTA */}
											<a
												href="#contact"
												className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-foreground rounded-full text-[0.9375rem] font-medium hover:bg-white/90 transition-colors"
											>
												Demander un devis
											</a>
										</div>
									</motion.div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
