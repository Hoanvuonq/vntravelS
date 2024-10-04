import './routes';
import './scss/main.scss';
import MainRouter from './routes';
import { UserProvider } from './hooks/UserContext';
const App = () => {
    return (
        <UserProvider>
            <MainRouter />
        </UserProvider>
        //up
    );
};

export default App;
