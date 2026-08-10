"use client";
import { useEffect } from "react";

const TrackingProvider = ({ children }) => {
    useEffect(() => {
        const trackVisitor = async () => {
            try {
                // 1. Get or Generate Fingerprint
                let fingerprint = localStorage.getItem("v_fingerprint");
                if (!fingerprint) {
                    fingerprint = 'fp_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
                    localStorage.setItem("v_fingerprint", fingerprint);
                }

                const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
                
                // 2. Track Visit
                await fetch(`${API_BASE_URL.replace('/gk/v1', '')}/visitor/track`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        fingerprint: fingerprint,
                        source: "website_visitor",
                        metadata: {
                            url: window.location.href,
                            referrer: document.referrer,
                            screen_resolution: `${window.screen.width}x${window.screen.height}`,
                            language: navigator.language
                        }
                    }),
                });

                // 3. Listen for form submissions to update contact info
                const handleFormSubmit = async (e) => {
                    const phoneInput = e.target.querySelector('input[type="tel"], input[name*="phone"]');
                    const emailInput = e.target.querySelector('input[type="email"], input[name*="email"]');
                    const nameInput = e.target.querySelector('input[name*="name"]');

                    if (phoneInput?.value || emailInput?.value) {
                        await fetch(`${API_BASE_URL.replace('/gk/v1', '')}/visitor/update-contact`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                fingerprint: fingerprint,
                                phone: phoneInput?.value,
                                email: emailInput?.value,
                                name: nameInput?.value
                            }),
                        });
                    }
                };

                document.addEventListener("submit", handleFormSubmit);
                return () => document.removeEventListener("submit", handleFormSubmit);

            } catch (error) {
                console.error("Tracking error:", error);
            }
        };

        trackVisitor();
    }, []);

    return <>{children}</>;
};

export default TrackingProvider;
