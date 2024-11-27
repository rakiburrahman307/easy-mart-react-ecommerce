import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import './ManageVendors.css';

const ManageVendors = () => {
      const { getStarting, vendors, setVendors, handleAllVendors } = useAuth();

      useEffect(() => {
            handleAllVendors()
      }, [])

      const handleBrandsDelete = ( id ) => {
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
                        const url = `http://localhost:5000/vendors/${id}`;
                        fetch(url, {
                        method: 'DELETE'
                        })
                        .then(res => res.json())
                        .then( data => {
                        if(data.deletedCount > 0){
                              Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Vendors Deleted Successfully',
                                    showConfirmButton: false,
                                    timer: 2000
                              })
                              const remaining = vendors?.filter(vendor => vendor._id !== id);
                              setVendors(remaining);
                        }
                        })

                  }
            })
      }

      return (
            <>
                  <>
                        <style type="text/css">
                              {
                                    `
                                    .easy-mart-manage-brands input{
                                    border: 1px solid ${getStarting?.primaryColor};
                                    color: ${getStarting?.primaryColor};
                                    }
                                    .easy-mart-manage-brands input:active, .easy-mart-manage-brands input:hover{
                                    border: 1px solid ${getStarting?.primaryColor};
                                    transition: 1s;
                                    }
                                    `
                              }
                        </style>
                  </>
                  <div className="easy-mart-manage-vendors-container">
                        <div className="container">
                        <h2 className="text-center py-1" style={{color: getStarting?.primaryColor}}>Manage Vendors</h2>
                              <Table hover responsive>
                                    <thead>
                                          <tr>
                                                <th>#</th>
                                                <th>Vendors</th>
                                                <th>Action</th>
                                          </tr>
                                    </thead>
                                    {
                                          vendors?.map((vendor, index) => <tbody key={index}>
                                          <tr>
                                                <td>#{index + 1}</td>
                                                <td>{vendor?.name}</td>
                                                <td>
                                                      <Button disabled={vendor._id ? false : true} onClick={() => handleBrandsDelete(vendor?._id)} style={{backgroundColor: getStarting?.primaryColor, border: 'none'}}><FontAwesomeIcon icon={faTrashAlt } /></Button>
                                                </td>
                                          </tr>
                                          </tbody>
                                    )}
                              </Table>
                        </div>
                  </div>
            </>
      );
};

export default ManageVendors;