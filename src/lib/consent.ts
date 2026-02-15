export type ConsentState = {
	necessary: true;
	analytics: boolean;
	marketing: boolean;
};

type StoredConsent = {
	consent: ConsentState;
	timestamp: number;
};

const STORAGE_KEY = "atout-consent";
const THIRTEEN_MONTHS_MS = 13 * 30 * 24 * 60 * 60 * 1000;

export function getStoredConsent(): ConsentState | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;

		const stored: StoredConsent = JSON.parse(raw);
		if (Date.now() - stored.timestamp > THIRTEEN_MONTHS_MS) {
			localStorage.removeItem(STORAGE_KEY);
			return null;
		}
		return stored.consent;
	} catch {
		return null;
	}
}

export function setConsent(consent: ConsentState): void {
	const stored: StoredConsent = { consent, timestamp: Date.now() };
	localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
	window.dispatchEvent(new CustomEvent("consent-update", { detail: consent }));
}

export function hasUserResponded(): boolean {
	return getStoredConsent() !== null;
}

export function revokeConsent(): void {
	localStorage.removeItem(STORAGE_KEY);
	window.dispatchEvent(
		new CustomEvent("consent-update", {
			detail: { necessary: true, analytics: false, marketing: false },
		}),
	);
}

export function openCookieBanner(): void {
	window.dispatchEvent(new Event("open-cookie-banner"));
}
