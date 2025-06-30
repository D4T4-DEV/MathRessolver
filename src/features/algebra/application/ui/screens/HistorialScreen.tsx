import React from 'react';
import { useHistoryViewModel } from '../../viewmodels/useHistory';
import { HistoryTemplate } from '../templates/HistoryTemplate';

const HistorialScreen = () => {
    const { loading, history } = useHistoryViewModel();

    return (
        <HistoryTemplate history={history} loading={loading} />
    );
};

export default HistorialScreen;