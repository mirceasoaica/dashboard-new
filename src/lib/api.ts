import { newPmsClient } from '@onemineral/pms-js-sdk';

export function getEndpoint() {
    if (import.meta.env.VITE_PMS_ENDPOINT) {
        return import.meta.env.VITE_PMS_ENDPOINT;
    }

    return window.location.protocol + '//' + window.location.host;
}

const api = newPmsClient({
    baseURL: getEndpoint() + '/rest/',
    onAuthError: () => {
        window.location.assign(
            getEndpoint() +
            '/auth/login/admin?redirect_to=' +
            encodeURIComponent(window.location.href),
        );
    },
});

export default api;
