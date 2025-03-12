import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RedirectLogin = ({ children }) => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    if (currentUser) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default RedirectLogin;
