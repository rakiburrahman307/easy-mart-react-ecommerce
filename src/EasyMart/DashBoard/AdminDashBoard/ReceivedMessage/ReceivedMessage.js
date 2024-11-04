import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './ReceivedMessage.css';

const ReceivedMessage = () => {
    document.title = "Received Message";
    const { getStarting, messages } = useAuth();
   
    const navigate = useNavigate();

    const handleMessageDetails = (_id) => {
        navigate(`${_id}`);
    }


    return (
      <div className="easy-mart-received-message-container">
            <div className="container pb-5">
                  <h2 className="text-center py-1" style={{color: getStarting?.primaryColor}}>Received Message</h2>

                  <Table hover responsive>
                  <thead>
                        <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Message</th>
                              <th>View</th>
                        </tr>
                  </thead>
                  {
                        messages?.map((message, i) => <tbody key={i}>
                        <tr>
                              <td>#{i + 1}</td>
                              <td>{message?.name}</td>
                              <td>{message?.email}</td>
                              <td>{message?.message?.length > 20 ? `${message?.message?.slice(0, 20)}...` : message?.message}</td>
                              <td>
                                    <Button disabled={message._id ? false : true} onClick={() => handleMessageDetails(message?._id)} style={{backgroundColor: getStarting?.primaryColor, border: 'none'}}><FontAwesomeIcon icon={faEye } /></Button>
                              </td>
                        </tr>
                        </tbody>
                  )}
            </Table>
            </div>
      </div>
    );
};

export default ReceivedMessage;