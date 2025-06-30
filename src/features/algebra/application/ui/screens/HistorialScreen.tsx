import React from 'react';
import { useHistoryViewModel } from '../../viewmodels/useHistory';
import { HistoryTemplate } from '../templates/HistoryTemplate';
import { useRouter } from 'expo-router';

const HistorialScreen = () => {
    const router = useRouter();
    const { loading, history, deleteHistory } = useHistoryViewModel();

    return (
        <HistoryTemplate
            history={history}
            loading={loading}
            onBack={() => router.replace('/')}
            onDelete={deleteHistory}
        />
    );
};

export default HistorialScreen;