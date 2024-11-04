
import React from 'react';
import { Container, Placeholder, Spinner } from 'react-bootstrap';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading, getStarting } = useAuth();
    
    let location = useLocation();
    if (isLoading) { return  <Container 
                            style={{height: "100vh", color: `${getStarting?.primaryColor}`}}
                            className="d-flex align-items-center justify-content-center">
                            <Spinner animation="border"/>
                        </Container>}
    
    // if (!user?.email ) {
    //     return <Navigate to="/login" state={{ from: location }} />;
    // }

    if (!user?.email && !user?.phoneNumber) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default PrivateRoute;

