import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import './ManageBrands.css';
import getBaseUrl from '../../../hooks/getBaseUrl';

const ManageBrands = () => {
    const { getStarting, brands, setBrands, handleAllBrands } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        handleAllBrands()
    }, [])

    const onSubmit = data => {

      const addData = {
        "logo_url": photoURL,
        "name": data?.name
     }

        fetch(`${getBaseUrl()}/brands`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addData)
        })
        .then(res => res.json())
        .then(result => {
            if(result.insertedId){
                toast.success("Successfully added new brands", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
                setBrands([...brands, addData]);



                //   fetch(`${getBaseUrl()}/users`)
                  // .then(res => res.json())
                  // .then(result => {
                  //       const adminUser = result?.filter(data => data?.role === 'admin');
                  //       setAdminList(adminUser)
                  // })
                  // .catch((error) => {
                  //       console.log(error)
                  // });
            }
            // else{
            //       Swal.fire({
            //             icon: 'error',
            //             title: 'Oops...',
            //             text: 'Something went wrong!',
            //       })
            // }
            reset();
            setPhotoURL("");
        })
        .catch((error) => {
            console.log(error)
        });
};


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
                  const url = `${getBaseUrl()}/brands/${id}`;
                  fetch(url, {
                      method: 'DELETE'
                  })
                  .then(res => res.json())
                  .then( data => {
                      if(data.deletedCount > 0){
                          Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: 'Brands Deleted Successfully',
                              showConfirmButton: false,
                              timer: 2000
                          })
                          const remaining = brands?.filter(brand => brand._id !== id);
                          setBrands(remaining);
                      }
                  })

              }
        })
  }

  const handleImageUpload = (e) => {
    const imageData = new FormData();
    imageData.set("key", "4bd48b1f6f9fc234e2c34cc57fcf0433");
    imageData.append("image", e.target.files[0]);

    fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: imageData
    })
    .then(res => res.json())
    .then((res) => {
          setPhotoURL(res.data.display_url);
        })
    .catch((error) => {
          console.log(error)
    });
};

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
                <div className="easy-mart-manage-brands-container">
                    <div className="container">
                        <h2 className="text-center py-1" style={{color: getStarting?.primaryColor}}>Manage Brands</h2>
                        <div className="easy-mart-manage-brands text-center mb-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                    <input type="file" onChange={handleImageUpload} defaultValue={photoURL} required/>
                                    <input placeholder="Enter brands....." {...register("name")} required/>
                                    <input type="submit" className="btn text-white w-50"  style={{backgroundColor: getStarting?.primaryColor}}/>
                            </form>
                        </div>

                        <Table hover responsive>
                            <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Brands</th>
                                        <th>Action</th>
                                    </tr>
                            </thead>
                            {
                                brands?.map((brand, index) => <tbody key={index}>
                                <tr>
                                    <td>#{index + 1}</td>
                                    <td>{brand?.name}</td>
                                    <td>
                                            <Button disabled={brand._id ? false : true} onClick={() => handleBrandsDelete(brand?._id)} style={{backgroundColor: getStarting?.primaryColor, border: 'none'}}><FontAwesomeIcon icon={faTrashAlt } /></Button>
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

export default ManageBrands;