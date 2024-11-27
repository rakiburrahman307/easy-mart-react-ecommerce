import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import "./MakeAdmin.css";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  document.title = "Admin";
  const { getStarting, token, userList, user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [adminList, setAdminList] = useState([]);

  const onSubmit = (data) => {
    const dataObject = {
      email: data?.email,
      currentUser: user?.email,
    };

    fetch("http://localhost:5000/users/admin/makeAdmin", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(dataObject),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.modifiedCount > 0) {
          // Successful admin creation
          toast.success("Successfully added new admin", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });

          // Refresh admin list
          fetch("http://localhost:5000/users")
            .then((res) => res.json())
            .then((result) => {
              const adminUser = result?.filter(
                (data) => data?.role === "admin"
              );
              setAdminList(adminUser);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (result?.matchedCount === 0) {
          // User email not found
          toast.success(`The email does not exist in the system.`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });
        } else {
          // No modifications made, but email exists
          toast.success(`The User is already an admin.`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });
        }

        // Reset the form
        reset();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while processing your request.",
        });
      });
  };

  useEffect(() => {
    const adminUser = userList?.filter((data) => data?.role === "admin");
    setAdminList(adminUser);
  }, [userList]);

  const handleRemoveAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/removeAdmin/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Admin Remove Successfully",
                showConfirmButton: false,
                timer: 2000,
              });
              const remaining = adminList?.filter((data) => data._id !== id);
              setAdminList(remaining);
            } else {
              alert("Admin");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <>
        <style type='text/css'>
          {`
                        .easy-mart-make-admin input{
                            border: 1px solid ${getStarting?.primaryColor};
                            color: ${getStarting?.primaryColor};
                        }
                        .easy-mart-make-admin input:active, .easy-mart-make-admin input:hover{
                            border: 1px solid ${getStarting?.primaryColor};
                            transition: 1s;
                        }
                        `}
        </style>
      </>
      <div className='easy-mart-make-admin-container'>
        <div className='container py-5'>
          <h2
            className='text-center py-1'
            style={{ color: getStarting?.primaryColor }}
          >
            Make Admin
          </h2>
          <div className='easy-mart-make-admin text-center mb-5'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                placeholder='Enter Email.....'
                {...register("email")}
                required
              />
              <input
                type='submit'
                className='btn text-white w-50'
                style={{ backgroundColor: getStarting?.primaryColor }}
              />
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
            {adminList?.map((admin, i) => (
              <tbody key={i}>
                <tr>
                  <td>#{i + 1}</td>
                  <td>{admin?.displayName}</td>
                  <td>{admin?.email}</td>
                  <td className='status'>
                    <span style={{ color: getStarting?.primaryColor }}>
                      {admin?.role}
                    </span>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleRemoveAdmin(admin?._id)}
                      disabled={user?.email === admin?.email}
                      style={{
                        backgroundColor: getStarting?.primaryColor,
                        border: "none",
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
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
