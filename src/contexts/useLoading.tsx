import { createContext, useContext, useState, ReactNode } from 'react';
import Loading from 'components/loading';

interface LoadingContextProps {
    setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ setLoading }}>
            {loading && <Loading />}
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
