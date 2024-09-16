import './routes';
import './scss/main.scss';
import MainRouter from './routes';
import { UserProvider } from './hooks/UserContext';
import { useEffect } from 'react';
import { checkInactivity } from 'api/api';

const App = () => {
    useEffect(() => {
        const intervalId = setInterval(checkInactivity, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <UserProvider>
            <MainRouter />
        </UserProvider>
    );
};

export default App;
