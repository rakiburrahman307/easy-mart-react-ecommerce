import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import useAuth from '../../../../hooks/useAuth';
import './MessageDetails.css';

const MessageDetails = () => {
      const {messageId} = useParams();
      const { getStarting, messages, setMessages } = useAuth();
      const [message, setMessage] = useState({});

      const navigate = useNavigate();

      useEffect( () => {
            const newMessage = messages?.find(message => message._id === messageId);
            setMessage(newMessage);
      }, [messages, messageId])

      const handleMessageRemove = (id) => {
            Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                        const url = `http://localhost:5000/message/${id}`;
                        fetch(url, {
                        method: 'DELETE'
                        })
                        .then(res => res.json())
                        .then( data => {
                        if(data.deletedCount > 0){
                                    Swal.fire({
                                          position: 'center',
                                          icon: 'success',
                                          title: 'Message Deleted Successfully',
                                          showConfirmButton: false,
                                          timer: 2000
                                    })
                                    const remaining = messages?.filter(message => message._id !== id);
                                    setMessages(remaining);
                                    navigate("/dashboard/message");
                              }
                        })
                  }
            })
      }
    
      return (
            <div className="easy-mart-message-details-container">
                  <div className="container py-5">
                        <h2 className="text-center py-1" style={{color: getStarting?.primaryColor}}>Received Message</h2>

                        <Table hover responsive>
                        <thead>
                              <tr>
                                    <td>
                                          <Button onClick={() => handleMessageRemove(message?._id)} style={{backgroundColor: getStarting?.primaryColor, border: 'none'}}><FontAwesomeIcon icon={faTrashAlt } /></Button>
                                    </td>
                                    <td>
                                          
                                    </td>
                              </tr>
                              <tr>
                                    <th>#</th>
                                    <th>Fields</th>
                              </tr>
                        </thead>
                  <tbody>
                              <tr>
                                    <td>Name</td>
                                    <td>{message?.name}</td>
                              </tr>
                              <tr>
                                    <td>Email</td>
                                    <td>{message?.email}</td>
                              </tr>
                              <tr>
                                    <td>Message</td>
                                    <td>{message?.message}</td>
                              </tr>
                        </tbody>
                  </Table>
                  </div>
            </div>
      );
};

export default MessageDetails;