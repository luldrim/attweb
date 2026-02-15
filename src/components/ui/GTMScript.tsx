"use client";

import { useEffect, useRef } from "react";
import { type ConsentState, getStoredConsent } from "@/lib/consent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

function pushConsent(
	command: "default" | "update",
	state: ConsentState,
): void {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		event: "consent_" + command,
		// Consent Mode v2 signals
		"gtag.consent": {
			command,
			params: {
				analytics_storage: state.analytics ? "granted" : "denied",
				ad_storage: state.marketing ? "granted" : "denied",
				ad_user_data: state.marketing ? "granted" : "denied",
				ad_personalization: state.marketing ? "granted" : "denied",
				functionality_storage: "granted",
				security_storage: "granted",
			},
		},
	});
}

function gtagConsent(
	command: "default" | "update",
	state: ConsentState,
): void {
	window.dataLayer = window.dataLayer || [];
	function gtag(...args: unknown[]) {
		window.dataLayer.push(args);
	}
	gtag("consent", command, {
		analytics_storage: state.analytics ? "granted" : "denied",
		ad_storage: state.marketing ? "granted" : "denied",
		ad_user_data: state.marketing ? "granted" : "denied",
		ad_personalization: state.marketing ? "granted" : "denied",
		functionality_storage: "granted",
		security_storage: "granted",
	});
}

function deleteCookies(prefixes: string[]): void {
	const cookies = document.cookie.split(";");
	for (const cookie of cookies) {
		const name = cookie.split("=")[0].trim();
		if (prefixes.some((p) => name.startsWith(p))) {
			document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
			document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
		}
	}
}

function injectGTM(id: string): void {
	if (document.getElementById("gtm-script")) return;

	const script = document.createElement("script");
	script.id = "gtm-script";
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
	document.head.appendChild(script);

	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		"gtm.start": Date.now(),
		event: "gtm.js",
	});
}

export default function GTMScript() {
	const injected = useRef(false);

	useEffect(() => {
		if (!GTM_ID) return;

		// Set consent defaults
		const stored = getStoredConsent();
		const defaultState: ConsentState = stored ?? {
			necessary: true,
			analytics: false,
			marketing: false,
		};
		gtagConsent("default", defaultState);

		// If user previously consented to analytics, inject GTM
		if (stored?.analytics && !injected.current) {
			injected.current = true;
			injectGTM(GTM_ID);
		}

		// Listen for consent updates
		function onConsentUpdate(e: Event) {
			const consent = (e as CustomEvent<ConsentState>).detail;
			gtagConsent("update", consent);
			pushConsent("update", consent);

			if (consent.analytics && !injected.current) {
				injected.current = true;
				injectGTM(GTM_ID!);
			}

			// If analytics revoked, clean up GA cookies
			if (!consent.analytics) {
				deleteCookies(["_ga", "_gid"]);
			}
			// If marketing revoked, clean up ad cookies
			if (!consent.marketing) {
				deleteCookies(["_gcl", "_fbp", "_fbc"]);
			}
		}

		window.addEventListener("consent-update", onConsentUpdate);
		return () =>
			window.removeEventListener("consent-update", onConsentUpdate);
	}, []);

	return null;
}
