import {Navigate} from 'react-router-dom'
import { useEffect } from 'react';

function Logout({ handleLogout }) {

    useEffect(() => {
      handleLogout();
    }, [handleLogout]);

    return <Navigate to="/top-feed" />;
}
export default Logout;