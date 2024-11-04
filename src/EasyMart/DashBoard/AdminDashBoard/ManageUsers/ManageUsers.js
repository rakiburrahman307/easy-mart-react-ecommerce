import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import './ManageUsers.css';

const ManageUsers = () => {
    document.title = 'Admin';
    const { getStarting, userList } = useAuth();

    const handleRemoveAdmin = (id) => {
      alert("Function are coming soon")
    }

    return (
      <div className="easy-mart-manage-user">
            <div className="container py-5">
                  <h2 className="text-center py-1" style={{color: getStarting?.primaryColor}}>All Users</h2>

                  <Table hover responsive>
                  <thead>
                        <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Action</th>
                        </tr>
                  </thead>
                  {
                        userList?.map((user, i) => <tbody key={i}>
                        <tr>
                              <td>#{i + 1}</td>
                              <td>{user?.displayName}</td>
                              <td>{user?.email}</td>
                              <td className="status">
                                    <span 
                                          style={{ 
                                                color: user?.role ? "#dc3545" : ( user?.vendor ? "#2948ff" : getStarting?.primaryColor ),
                                                padding: user?.role ? "5px 17px" : ( user?.vendor ? "5px 15px" : "5px 25px")
                                                }}>
                                          {user?.role ? user?.role : ( user?.vendor ? "vendor" : "user")}
                                    </span>   
                              </td>
                              <td>
                                    <Button onClick={() => handleRemoveAdmin(user?._id)} style={{backgroundColor: getStarting?.primaryColor, border: 'none'}}><FontAwesomeIcon icon={faTrashAlt } /></Button>
                              </td>
                        </tr>
                        </tbody>
                  )}
            </Table>
            </div>
      </div>

    );
};

export default ManageUsers;