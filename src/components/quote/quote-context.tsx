"use client";

import {
	createContext,
	useContext,
	useReducer,
	useCallback,
	type Dispatch,
	type ReactNode,
} from "react";
import { toast } from "sonner";

/* ─── Types ─── */

export type ClientType = "particulier" | "professionnel";
export type ProjectType =
	| "renovation"
	| "construction"
	| "amenagement"
	| "extension"
	| "";

export type QuoteFormData = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	clientType: ClientType;
	companyName: string;
	projectType: ProjectType;
	surface: string;
	location: string;
	description: string;
	plans: File[];
	photos: File[];
	rgpdAccepted: boolean;
};

export type QuoteState = {
	currentStep: number; // 0-3
	data: QuoteFormData;
	errors: Record<string, string>;
	direction: 1 | -1;
	submitted: boolean;
	loading: boolean;
	contactId: string | null;
	demandeId: string | null;
};

/* ─── Actions ─── */

export type QuoteAction =
	| { type: "SET_FIELD"; field: keyof QuoteFormData; value: string }
	| { type: "SET_CLIENT_TYPE"; value: ClientType }
	| { type: "SET_PROJECT_TYPE"; value: ProjectType }
	| { type: "TOGGLE_RGPD" }
	| { type: "ADD_FILES"; field: "plans" | "photos"; files: File[] }
	| { type: "REMOVE_FILE"; field: "plans" | "photos"; index: number }
	| { type: "GO_TO_STEP"; step: number; direction: 1 | -1 }
	| { type: "PREV_STEP" }
	| { type: "SET_ERRORS"; errors: Record<string, string> }
	| { type: "SET_LOADING"; loading: boolean }
	| { type: "SET_CONTACT_ID"; contactId: string }
	| { type: "SET_DEMANDE_ID"; demandeId: string }
	| { type: "SET_SUBMITTED" };

/* ─── Validation ─── */

export function validateStep(
	step: number,
	data: QuoteFormData
): Record<string, string> {
	const errors: Record<string, string> = {};

	if (step === 0) {
		if (!data.firstName.trim()) errors.firstName = "Prénom requis";
		if (!data.lastName.trim()) errors.lastName = "Nom requis";
		if (!data.phone.trim()) errors.phone = "Téléphone requis";
		if (!data.email.trim()) {
			errors.email = "Email requis";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
			errors.email = "Email invalide";
		}
		if (data.clientType === "professionnel" && !data.companyName.trim()) {
			errors.companyName = "Nom d'entreprise requis";
		}
		if (!data.rgpdAccepted) {
			errors.rgpdAccepted =
				"Vous devez accepter la politique de confidentialité";
		}
	}

	if (step === 1) {
		if (!data.projectType)
			errors.projectType = "Choisissez un type de projet";
		if (!data.location.trim()) errors.location = "Localisation requise";
	}

	return errors;
}

/* ─── Reducer ─── */

const initialData: QuoteFormData = {
	firstName: "",
	lastName: "",
	phone: "",
	email: "",
	clientType: "particulier",
	companyName: "",
	projectType: "",
	surface: "",
	location: "",
	description: "",
	plans: [],
	photos: [],
	rgpdAccepted: false,
};

export const initialState: QuoteState = {
	currentStep: 0,
	data: initialData,
	errors: {},
	direction: 1,
	submitted: false,
	loading: false,
	contactId: null,
	demandeId: null,
};

function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
	switch (action.type) {
		case "SET_FIELD":
			return {
				...state,
				data: { ...state.data, [action.field]: action.value },
				errors: { ...state.errors, [action.field]: "" },
			};

		case "SET_CLIENT_TYPE":
			return {
				...state,
				data: {
					...state.data,
					clientType: action.value,
					companyName:
						action.value === "particulier"
							? ""
							: state.data.companyName,
				},
				errors: { ...state.errors, companyName: "" },
			};

		case "SET_PROJECT_TYPE":
			return {
				...state,
				data: { ...state.data, projectType: action.value },
				errors: { ...state.errors, projectType: "" },
			};

		case "TOGGLE_RGPD":
			return {
				...state,
				data: { ...state.data, rgpdAccepted: !state.data.rgpdAccepted },
				errors: { ...state.errors, rgpdAccepted: "" },
			};

		case "ADD_FILES":
			return {
				...state,
				data: {
					...state.data,
					[action.field]: [
						...state.data[action.field],
						...action.files,
					],
				},
			};

		case "REMOVE_FILE":
			return {
				...state,
				data: {
					...state.data,
					[action.field]: state.data[action.field].filter(
						(_, i) => i !== action.index
					),
				},
			};

		case "GO_TO_STEP":
			return {
				...state,
				currentStep: action.step,
				errors: {},
				direction: action.direction,
			};

		case "PREV_STEP":
			if (state.currentStep <= 0) return state;
			return {
				...state,
				currentStep: state.currentStep - 1,
				errors: {},
				direction: -1,
			};

		case "SET_ERRORS":
			return { ...state, errors: action.errors };

		case "SET_LOADING":
			return { ...state, loading: action.loading };

		case "SET_CONTACT_ID":
			return { ...state, contactId: action.contactId };

		case "SET_DEMANDE_ID":
			return { ...state, demandeId: action.demandeId };

		case "SET_SUBMITTED":
			return {
				...state,
				currentStep: 3,
				submitted: true,
				errors: {},
				direction: 1,
				loading: false,
			};

		default:
			return state;
	}
}

/* ─── Async step handlers ─── */

async function submitStep0(
	state: QuoteState,
	dispatch: Dispatch<QuoteAction>
): Promise<boolean> {
	const { data } = state;

	dispatch({ type: "SET_LOADING", loading: true });
	try {
		const res = await fetch("/api/quote/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				firstName: data.firstName,
				lastName: data.lastName,
				phone: data.phone,
				email: data.email,
				clientType: data.clientType,
				companyName: data.companyName,
			}),
		});

		if (!res.ok) {
			const body = await res.json().catch(() => ({})) as { error?: string };
			throw new Error(
				body.error || "Erreur lors de la sauvegarde du contact"
			);
		}

		const { contactId } = (await res.json()) as { contactId: string };
		dispatch({ type: "SET_CONTACT_ID", contactId });
		dispatch({ type: "GO_TO_STEP", step: 1, direction: 1 });
		return true;
	} catch (err) {
		toast.error(
			err instanceof Error
				? err.message
				: "Erreur lors de la sauvegarde du contact"
		);
		return false;
	} finally {
		dispatch({ type: "SET_LOADING", loading: false });
	}
}

async function submitStep1(
	state: QuoteState,
	dispatch: Dispatch<QuoteAction>
): Promise<boolean> {
	const { data, contactId, demandeId } = state;

	if (!contactId) {
		toast.error("Contact non enregistré. Retournez à l'étape précédente.");
		return false;
	}

	dispatch({ type: "SET_LOADING", loading: true });
	try {
		const res = await fetch("/api/quote/demande", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				contactId,
				demandeId: demandeId ?? undefined,
				projectType: data.projectType,
				surface: data.surface,
				location: data.location,
			}),
		});

		if (!res.ok) {
			const body = await res.json().catch(() => ({})) as { error?: string };
			throw new Error(
				body.error || "Erreur lors de la création de la demande"
			);
		}

		const result = (await res.json()) as { demandeId: string };
		if (!demandeId) {
			dispatch({ type: "SET_DEMANDE_ID", demandeId: result.demandeId });
		}
		dispatch({ type: "GO_TO_STEP", step: 2, direction: 1 });
		return true;
	} catch (err) {
		toast.error(
			err instanceof Error
				? err.message
				: "Erreur lors de la création de la demande"
		);
		return false;
	} finally {
		dispatch({ type: "SET_LOADING", loading: false });
	}
}

async function submitStep2(
	state: QuoteState,
	dispatch: Dispatch<QuoteAction>
): Promise<boolean> {
	const { data, demandeId } = state;

	if (!demandeId) {
		toast.error("Demande non créée. Retournez à l'étape précédente.");
		return false;
	}

	dispatch({ type: "SET_LOADING", loading: true });
	try {
		const formData = new FormData();
		formData.append("demandeId", demandeId);
		if (data.description) {
			formData.append("description", data.description);
		}
		for (const file of data.plans) {
			formData.append("plans", file, file.name);
		}
		for (const file of data.photos) {
			formData.append("photos", file, file.name);
		}

		const res = await fetch("/api/quote/demande", {
			method: "PATCH",
			body: formData,
		});

		if (!res.ok) {
			const body = await res.json().catch(() => ({})) as { error?: string };
			throw new Error(
				body.error || "Erreur lors de la mise à jour de la demande"
			);
		}

		dispatch({ type: "SET_SUBMITTED" });
		toast.success("Votre demande de devis a bien été envoyée !");
		return true;
	} catch (err) {
		toast.error(
			err instanceof Error
				? err.message
				: "Erreur lors de l'envoi de la demande"
		);
		return false;
	} finally {
		dispatch({ type: "SET_LOADING", loading: false });
	}
}

/* ─── Context ─── */

type QuoteContextValue = {
	state: QuoteState;
	dispatch: Dispatch<QuoteAction>;
	submitCurrentStep: () => Promise<boolean>;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(quoteReducer, initialState);

	const submitCurrentStep = useCallback(async (): Promise<boolean> => {
		// Validate first
		const errors = validateStep(state.currentStep, state.data);
		if (Object.values(errors).some((e) => e)) {
			dispatch({ type: "SET_ERRORS", errors });
			return false;
		}

		switch (state.currentStep) {
			case 0:
				return submitStep0(state, dispatch);
			case 1:
				return submitStep1(state, dispatch);
			case 2:
				return submitStep2(state, dispatch);
			default:
				return false;
		}
	}, [state]);

	return (
		<QuoteContext.Provider value={{ state, dispatch, submitCurrentStep }}>
			{children}
		</QuoteContext.Provider>
	);
}

export function useQuote() {
	const ctx = useContext(QuoteContext);
	if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
	return ctx;
}
