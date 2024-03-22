import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginMiddleware() {
    const navigate = useNavigate();
    useEffect(() => {
        if(sessionStorage.getItem('userinfo')){
            navigate('/');
        } else {
            window.location.reload();
        }
    },[]);
    return (
        <div>Loding...</div>
    )
}

export default LoginMiddleware;