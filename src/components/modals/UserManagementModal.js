import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import backendApiClient from '../../api/backendConfig';

const UserManagementModal = ({ show, handleClose }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setError(null);
            try {
                const response = await backendApiClient.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users');
            }
        };

        if (show) {
            fetchUsers();
        }
    }, [show]);

    const handleAddUserRole = async (userId, roleName) => {
        try {
            await backendApiClient.put(`/users/${userId}/role`, roleName);
            const updatedUsers = users.map(user => {
                if (user.id === userId) {
                    // Aquí asumimos que user.roles es un arreglo de objetos Role
                    return { ...user, roles: [...user.roles, { roleName }] }; // Agrega el rol localmente
                }
                return user;
            });
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error añadiendo el rol:', error);
            if (error.response) {
                setError('Error añadiendo el rol: ' + error.response.data);
            } else if (error.request) {
                setError('No se recibió respuesta del servidor');
            } else {
                setError('Error de solicitud: ' + error.message);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Gestionar Usuarios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="error-message">Error: {error}</div>}
                {!error && (
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                <div>{user.username}</div>
                                <div>Roles: {user.roles.map(role => role.roleName).join(', ')}</div>
                                <div>
                                    <select onChange={(e) => handleAddUserRole(user.id, e.target.value)}>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="USER">USER</option>
                                        <option value="INVITED">INVITED</option>
                                        <option value="DEVELOPER">DEVELOPER</option>
                                    </select>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default UserManagementModal;

