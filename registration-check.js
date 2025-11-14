// Shared registration verification utility
// This file should be loaded before script.js and challenge.js

(function() {
    'use strict';

    // Cloud Function endpoint for registration check
    const REGISTRATION_CHECK_URL = 'https://check-registration-ab3dammvgq-uc.a.run.app';

    let registrationCache = new Map();
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    // Function to check if email is registered
    async function isEmailRegistered(email) {
        const normalizedEmail = email.trim().toLowerCase();
        
        // Check cache first
        const cached = registrationCache.get(normalizedEmail);
        if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
            return cached.registered;
        }

        try {
            const response = await fetch(REGISTRATION_CHECK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: normalizedEmail })
            });

            if (response.ok) {
                const data = await response.json();
                const registered = data.registered === true;
                
                // Cache the result
                registrationCache.set(normalizedEmail, {
                    registered: registered,
                    name: data.name,
                    timestamp: Date.now()
                });
                
                return registered;
            } else {
                // Not registered
                registrationCache.set(normalizedEmail, {
                    registered: false,
                    timestamp: Date.now()
                });
                return false;
            }
        } catch (error) {
            console.error('Error checking registration:', error);
            return false;
        }
    }

    // Expose to global scope
    window.RegistrationChecker = {
        isEmailRegistered: isEmailRegistered
    };
})();
