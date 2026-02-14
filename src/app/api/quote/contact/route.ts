import { NextResponse } from "next/server";
import {
	findContactByPhoneOrEmail,
	createContact,
	updateContact,
	CONTACT_FIELDS,
} from "@/lib/airtable";

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as {
			firstName: string;
			lastName: string;
			phone: string;
			email: string;
			clientType: string;
			companyName?: string;
		};
		const { firstName, lastName, phone, email, clientType, companyName } = body;

		if (!firstName || !lastName || !phone || !email) {
			return NextResponse.json(
				{ error: "Champs requis manquants" },
				{ status: 400 }
			);
		}

		const fullName = `${firstName} ${lastName}`;
		const typeValue =
			clientType === "professionnel" ? "Professionnel" : "Particulier";

		// Check if contact already exists
		const existing = await findContactByPhoneOrEmail(phone, email);

		if (existing) {
			// Update the existing contact with latest info
			const updated = await updateContact(existing.id, {
				[CONTACT_FIELDS.nom]: fullName,
				[CONTACT_FIELDS.type]: typeValue,
				[CONTACT_FIELDS.telephone]: phone,
				[CONTACT_FIELDS.email]: email,
				...(companyName
					? { [CONTACT_FIELDS.entreprise]: companyName }
					: {}),
			});
			return NextResponse.json({
				contactId: updated.id,
				isNew: false,
			});
		}

		// Create new contact
		const created = await createContact({
			[CONTACT_FIELDS.nom]: fullName,
			[CONTACT_FIELDS.type]: typeValue,
			[CONTACT_FIELDS.telephone]: phone,
			[CONTACT_FIELDS.email]: email,
			...(companyName
				? { [CONTACT_FIELDS.entreprise]: companyName }
				: {}),
		});

		return NextResponse.json({
			contactId: created.id,
			isNew: true,
		});
	} catch (error) {
		console.error("Quote contact error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la sauvegarde du contact" },
			{ status: 500 }
		);
	}
}
