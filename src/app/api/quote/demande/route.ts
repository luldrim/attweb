import { NextResponse } from "next/server";
import {
	createDemande,
	updateDemande,
	uploadAttachment,
	DEMANDE_FIELDS,
} from "@/lib/airtable";

// Step 2: Create or update a demande linked to the contact
export async function POST(req: Request) {
	try {
		const body = (await req.json()) as {
			contactId: string;
			demandeId?: string;
			projectType: string;
			surface?: string;
			location: string;
		};
		const { contactId, demandeId, projectType, surface, location } = body;

		if (!contactId || !projectType || !location) {
			return NextResponse.json(
				{ error: "Champs requis manquants" },
				{ status: 400 }
			);
		}

		const typeMap: Record<string, string> = {
			renovation: "Rénovation",
			construction: "Construction neuve",
			amenagement: "Aménagement intérieur",
			extension: "Extension/Surélévation",
		};

		const typeTravaux = typeMap[projectType] ?? projectType;
		let parsedSurface: number | undefined;
		if (surface) {
			const p = parseFloat(surface);
			if (!isNaN(p)) parsedSurface = p;
		}

		// Update existing demande
		if (demandeId) {
			const fields: Record<string, unknown> = {
				[DEMANDE_FIELDS.typeTravaux]: typeTravaux,
				[DEMANDE_FIELDS.ville]: location,
			};
			if (parsedSurface !== undefined) {
				fields[DEMANDE_FIELDS.tailleM2] = parsedSurface;
			}
			await updateDemande(demandeId, fields);
			return NextResponse.json({ demandeId });
		}

		// Create new demande
		const fields: Record<string, unknown> = {
			[DEMANDE_FIELDS.contact]: [contactId],
			[DEMANDE_FIELDS.typeTravaux]: typeTravaux,
			[DEMANDE_FIELDS.ville]: location,
			[DEMANDE_FIELDS.canal]: "Site web",
			[DEMANDE_FIELDS.statut]: "Nouvelle",
			[DEMANDE_FIELDS.dateReception]: new Date().toISOString(),
		};
		if (parsedSurface !== undefined) {
			fields[DEMANDE_FIELDS.tailleM2] = parsedSurface;
		}

		const created = await createDemande(fields);
		return NextResponse.json({ demandeId: created.id });
	} catch (error) {
		console.error("Quote demande create error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la création de la demande" },
			{ status: 500 }
		);
	}
}

// Convert a File from FormData to base64 string
async function fileToBase64(file: File): Promise<string> {
	const buffer = await file.arrayBuffer();
	const bytes = new Uint8Array(buffer);
	let binary = "";
	for (let i = 0; i < bytes.length; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

// Step 3: Update demande with description + upload files
export async function PATCH(req: Request) {
	try {
		const formData = await req.formData();
		const demandeId = formData.get("demandeId") as string;
		const description = formData.get("description") as string | null;

		if (!demandeId) {
			return NextResponse.json(
				{ error: "ID de demande manquant" },
				{ status: 400 }
			);
		}

		// Update description if provided
		if (description) {
			await updateDemande(demandeId, {
				[DEMANDE_FIELDS.message]: description,
			});
		}

		// Upload plans
		const plans = formData.getAll("plans") as File[];
		for (const file of plans) {
			if (file.size > 0) {
				const base64 = await fileToBase64(file);
				await uploadAttachment(
					demandeId,
					DEMANDE_FIELDS.plans,
					base64,
					file.name,
					file.type || "application/octet-stream"
				);
			}
		}

		// Upload photos
		const photos = formData.getAll("photos") as File[];
		for (const file of photos) {
			if (file.size > 0) {
				const base64 = await fileToBase64(file);
				await uploadAttachment(
					demandeId,
					DEMANDE_FIELDS.images,
					base64,
					file.name,
					file.type || "image/jpeg"
				);
			}
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Quote demande update error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la mise à jour de la demande" },
			{ status: 500 }
		);
	}
}
