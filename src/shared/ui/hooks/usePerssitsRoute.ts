import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

const PersistRoute = () => {
    const router = useRouter();

    useEffect(() => {
        const currentPath = window.location.pathname;
        // Guardar ruta en sessionStorage
        sessionStorage.setItem('lastPath', currentPath);
    }, [window.location.pathname]);

    useEffect(() => {
        const lastPath = sessionStorage.getItem('lastPath');
        if (lastPath && lastPath !== window.location.pathname) {
            router.replace(lastPath);
        }
    }, []);

    return null;
};

export default PersistRoute;
