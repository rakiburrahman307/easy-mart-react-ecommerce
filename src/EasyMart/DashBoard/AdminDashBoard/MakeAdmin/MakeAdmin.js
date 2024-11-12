import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Swal } from 'sweetalert2/dist/sweetalert2';
import useAuth from '../../../hooks/useAuth';
import './MakeAdmin.css';

const MakeAdmin = () => {
    document.title = 'Admin';
    const { getStarting, token, userList } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [adminList, setAdminList] = useState([])

    const onSubmit = data => {
        fetch('https://easymartbackend.vercel.app/users/admin', {
            method: 'PUT',
            headers: { 
                  'authorization': `Bearer ${token}`,
                  'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if(result.modifiedCount > 0){
                toast.success("Successfully added new admin", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });

                  fetch("https://easymartbackend.vercel.app/users")
                  .then(res => res.json())
                  .then(result => {
                        const adminUser = result?.filter(data => data?.role === 'admin');
                        setAdminList(adminUser)
                  })
                  .catch((error) => {
                        console.log(error)
                  });
            }
            else{
                  Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                  })
            }
            reset();
        })
        .catch((error) => {
            console.log(error)
        });
    };

    useEffect( () => {
            const adminUser = userList?.filter(data => data?.role === 'admin');
            setAdminList(adminUser)
    }, [userList])

    const handleRemoveAdmin = (id) => {
      // fetch(`https://easymartbackend.vercel.app/users/${id}`, {
      //   method: "DELETE",
      // })
      // .then(res => res.json())
      // .then(data =>{
      //       if(data.deletedCount > 0){
      //             Swal.fire({
      //                 position: 'center',
      //                 icon: 'success',
      //                 title: 'Admin Remove Successfully',
      //                 showConfirmButton: false,
      //                 timer: 2000
      //             })
      //             const remaining = adminList?.filter(data => data._id !== id);
      //             setAdminList(remaining)
      //       }
      //       else{
      //             alert("Admin")
      //       }
      // })
      // .catch((error) => {
      //       console.log(error)
      // });

      alert("Function are coming soon")

    }

    return (
        <>
            <>
                <style type="text/css">
                    {
                        `
                        .easy-mart-make-admin input{
                            border: 1px solid ${getStarting?.primaryColor};
                            color: ${getStarting?.primaryColor};
                        }
                        .easy-mart-make-admin input:active, .easy-mart-make-admin input:hover{
                            border: 1px solid ${getStarting?.primaryColor};
                            transition: 1s;
                        }
                        `
                    }
                </style>
            </>
            <div className="easy-mart-make-admin-container">
                  <div className="container py-5">
                        <h2 className="text-center py-1" style={{color: getStarting?.primaryColor}}>Make Admin</h2>
                        <div className="easy-mart-make-admin text-center mb-5">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                    <input placeholder="Enter Email....." {...register("email")} required/>
                                    <input type="submit" className="btn text-white w-50"  style={{backgroundColor: getStarting?.primaryColor}}/>
                              </form>
                        </div>

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
                              adminList?.map((admin, i) => <tbody key={i}>
                              <tr>
                                    <td>#{i + 1}</td>
                                    <td>{admin?.displayName}</td>
                                    <td>{admin?.email}</td>
                                    <td className="status">
                                        <span style={{ color: getStarting?.primaryColor}}>{admin?.role}</span>   
                                    </td>
                                    <td>
                                          <Button onClick={() => handleRemoveAdmin(admin?._id)} style={{backgroundColor: getStarting?.primaryColor, border: 'none'}}><FontAwesomeIcon icon={faTrashAlt } /></Button>
                                    </td>
                              </tr>
                              </tbody>
                        )}
                        {/* <tbody>
                              <tr>
                                    <td>hi</td>
                                    <td>hi</td>
                                    <td>hi</td>
                                    <td>hi</td>
                              </tr>
                        </tbody> */}
                  </Table>
                  </div>
            </div>
        </>
    );
};

export default MakeAdmin;