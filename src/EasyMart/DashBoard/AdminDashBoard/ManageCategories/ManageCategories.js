import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import './ManageCategories.css';
import getBaseUrl from '../../../hooks/getBaseUrl';

const ManageCategories = () => {
      const { getStarting, categories, setCategories } = useAuth();
      const { register, handleSubmit, reset } = useForm();
      const [photoURL, setPhotoURL] = useState("");

      const onSubmit = data => {

            // const subCategories = [];

            // const formData = new FormData();
            // formData.append('name', data?.name);
            // formData.append('logo_url', photoURL);
            // formData.append('subCategories', []);

            const addData = {
                  "logo_url": photoURL,
                  "name": data?.name,
                  "subCategories": []
            }

            fetch(`${getBaseUrl()}/categories`, {
                  method: 'POST',
                  headers: {
                        'content-type': 'application/json'
                  },
                  body: JSON.stringify(addData)
            })
            .then(res => res.json())
            .then(result => {
                  if(result.insertedId){
                        toast.success("Successfully added new categories", {
                              position: toast.POSITION.TOP_RIGHT,
                              autoClose: 5000,
                        });
                        setCategories([...categories, addData]);
                  }
                  reset();
                  setPhotoURL("");
            })
            .catch((error) => {
                  console.log(error)
            });
      };

      const handleCategoriesDelete = ( id ) => {
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
                        const url = `${getBaseUrl()}/categories/${id}`;
                        fetch(url, {
                        method: 'DELETE'
                        })
                        .then(res => res.json())
                        .then( data => {
                        if(data.deletedCount > 0){
                              Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Categories Deleted Successfully',
                                    showConfirmButton: false,
                                    timer: 2000
                              })
                              const remaining = categories?.filter(cate => cate._id !== id);
                              setCategories(remaining);
                        }
                        })

                  }
            })
      }


      const handleImageUpload = (e) => {
            const imageData = new FormData();
            imageData.set("key", "4bd48b1f6f9fc234e2c34cc57fcf0433");
            imageData.append("image", e.target.files[0]);
            // axios
            //   .post("https://api.imgbb.com/1/upload", imageData)
            //   .then((res) => {
            //     setPhotoURL(res.data.data.display_url);
            //   })
            // .catch((error) => {
            //       console.log("error", error)
            // });


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
                                    .easy-mart-manage-categories input{
                                          border: 1px solid ${getStarting?.primaryColor};
                                          color: ${getStarting?.primaryColor};
                                    }
                                    .easy-mart-manage-categories input:active, .easy-mart-manage-categories input:hover{
                                          border: 1px solid ${getStarting?.primaryColor};
                                          transition: 1s;
                                    }
                                    `
                              }
                        </style>
                  </>
                  <div className="easy-mart-manage-categories-container">
                        <div className="container">
                              <h2 className="text-center py-1" style={{color: getStarting?.primaryColor}}>Manage Categories</h2>
                              <div className="easy-mart-manage-categories text-center mb-5">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                          <input type="file" onChange={handleImageUpload} defaultValue={photoURL} required/>
                                          <input placeholder="Enter categories....." {...register("name")} required/>
                                          <input type="submit" className="btn text-white w-50"  style={{backgroundColor: getStarting?.primaryColor}}/>
                                    </form>
                              </div>

                              <Table hover responsive>
                                    <thead>
                                          <tr>
                                                <th>#</th>
                                                <th>Categories</th>
                                                <th>Sub Categories</th>
                                                <th>Action</th>
                                          </tr>
                                    </thead>
                                    {
                                          categories?.map((category, index) => <tbody key={index}>
                                          <tr>
                                                <td>#{index + 1}</td>
                                                <td>{category?.name}</td>
                                                <td>
                                                      {
                                                      ( category?.subCategories?.length === 0 || !category?.subCategories ) ?
                                                            "------"
                                                            :
                                                            <select style={{ border: `1px solid ${getStarting?.primaryColor}`}}>
                                                                  {
                                                                        category?.subCategories?.map((cate, i) => (
                                                                              <option value={cate?.name} key={i}>{cate?.name}</option>
                                                                        ))
                                                                  }
                                                            </select>
                                                      }
                                                </td>
                                                <td>
                                                      <Button disabled={category._id ? false : true} onClick={() => handleCategoriesDelete(category?._id)} style={{backgroundColor: getStarting?.primaryColor, border: 'none'}}><FontAwesomeIcon icon={faTrashAlt } /></Button>
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

export default ManageCategories;