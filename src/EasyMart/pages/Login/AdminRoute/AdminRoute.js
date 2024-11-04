
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLocation, Navigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

const AdminRoute = ({ children, ...rest }) => {
    const { user, admin, getStarting, isLoading } = useAuth();

    let location = useLocation();

    if (isLoading) { return  <Container
                        style={{height: "100vh", color: `${getStarting?.primaryColor}`}}
                        className="d-flex align-items-center justify-content-center">
                        <Spinner animation="border"/>
                    </Container>}
    if (!user?.email && !admin) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default AdminRoute;

