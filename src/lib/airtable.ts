const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

const headers = {
	Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
	"Content-Type": "application/json",
};

/* ─── Table IDs ─── */
const TABLES = {
	contacts: "tblrGcw3ZWq0nkCWp",
	projets: "tblZ6w5i3rJkQacv3",
	demandes: "tbl4llqCthZ5CpeZ2",
} as const;

/* ─── Field IDs ─── */
export const CONTACT_FIELDS = {
	nom: "flddqJ7PgYsGqpnWb",
	type: "fldRbFzozqzFuu8mJ",
	entreprise: "fldvVAMmbs4GHEgwy",
	telephone: "fldEkwPKkSZZDTF5n",
	email: "fldICXXirX9t8lWjS",
	adresse: "fldcD1NkgphwnmXsT",
	notes: "fld47txrc9TkIY7vZ",
} as const;

export const DEMANDE_FIELDS = {
	dateReception: "fld1WbnDNBKnJIkaM",
	message: "fldNKLsKeWNbKpx5F",
	contact: "fldv3kgWVlfcHFCIO",
	statut: "fld6QfuKLFglfvxzB",
	projet: "fldV3b9fRX6rsEQKS",
	typeTravaux: "fld7uzSC7I8jWyRjz",
	canal: "fld3m9qjAJdxJVfDm",
	plans: "fldFq4lgugjo1v4Mo",
	notesInternes: "fldPxAIPwj6WsOUjS",
	images: "fldiK38cnsXM6yXln",
	tailleM2: "fldU6GwH7UqkJiz54",
	adresse: "fldKfUP229pV9EvQS",
	ville: "fldibDTfs7v9bR2ab",
} as const;

/* ─── Generic helpers ─── */

type AirtableRecord = {
	id: string;
	fields: Record<string, unknown>;
};

type AirtableListResponse = {
	records: AirtableRecord[];
	offset?: string;
};

async function airtableFetch(
	path: string,
	options?: RequestInit
): Promise<Response> {
	const res = await fetch(`${BASE_URL}${path}`, {
		...options,
		headers: { ...headers, ...options?.headers },
	});
	if (!res.ok) {
		const body = await res.text();
		throw new Error(`Airtable API error ${res.status}: ${body}`);
	}
	return res;
}

/* ─── Contacts ─── */

export async function findContactByPhoneOrEmail(
	phone: string,
	email: string
): Promise<AirtableRecord | null> {
	const formula = `OR({${CONTACT_FIELDS.telephone}}="${phone}",{${CONTACT_FIELDS.email}}="${email}")`;
	const params = new URLSearchParams({
		filterByFormula: formula,
		maxRecords: "1",
	});

	const res = await airtableFetch(
		`/${TABLES.contacts}?${params.toString()}`
	);
	const data: AirtableListResponse = await res.json();
	return data.records[0] ?? null;
}

export async function createContact(fields: Record<string, unknown>): Promise<AirtableRecord> {
	const res = await airtableFetch(`/${TABLES.contacts}`, {
		method: "POST",
		body: JSON.stringify({ fields }),
	});
	return res.json();
}

export async function updateContact(
	recordId: string,
	fields: Record<string, unknown>
): Promise<AirtableRecord> {
	const res = await airtableFetch(`/${TABLES.contacts}/${recordId}`, {
		method: "PATCH",
		body: JSON.stringify({ fields }),
	});
	return res.json();
}

/* ─── Demandes ─── */

export async function createDemande(fields: Record<string, unknown>): Promise<AirtableRecord> {
	const res = await airtableFetch(`/${TABLES.demandes}`, {
		method: "POST",
		body: JSON.stringify({ fields }),
	});
	return res.json();
}

export async function updateDemande(
	recordId: string,
	fields: Record<string, unknown>
): Promise<AirtableRecord> {
	const res = await airtableFetch(`/${TABLES.demandes}/${recordId}`, {
		method: "PATCH",
		body: JSON.stringify({ fields }),
	});
	return res.json();
}

/* ─── Attachments ─── */

const CONTENT_URL = `https://content.airtable.com/v0/${AIRTABLE_BASE_ID}`;

export async function uploadAttachment(
	recordId: string,
	fieldId: string,
	fileBase64: string,
	filename: string,
	contentType: string
): Promise<void> {
	const res = await fetch(
		`${CONTENT_URL}/${recordId}/${fieldId}/uploadAttachment`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contentType,
				file: fileBase64,
				filename,
			}),
		}
	);

	if (!res.ok) {
		const body = await res.text();
		throw new Error(`Airtable upload error ${res.status}: ${body}`);
	}
}
