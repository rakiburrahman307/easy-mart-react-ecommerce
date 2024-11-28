import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Table } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import "./ManageUsers.css";
import Swal from "sweetalert2";
import getBaseUrl from "../../../hooks/getBaseUrl";

const ManageUsers = () => {
  document.title = "Admin";
  const { getStarting, userList, setUserList, user: currentUser } = useAuth();

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
        fetch(`${getBaseUrl()}/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Admin removed successfully!",
                showConfirmButton: false,
                timer: 2000,
              });

              // Update the user list after deletion
              setUserList((prevList) =>
                prevList.filter((user) => user._id !== id)
              );
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to remove admin!",
              });
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong. Please try again!",
            });
          });
      }
    });
  };

  return (
    <div className='easy-mart-manage-user'>
      <div className='container py-5'>
        <h2
          className='text-center py-1'
          style={{ color: getStarting?.primaryColor }}
        >
          All Users
        </h2>

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
          {userList?.map((user, i) => (
            <tbody key={i}>
              <tr>
                <td>#{i + 1}</td>
                <td>{user?.displayName}</td>
                <td>{user?.email}</td>
                <td className='status'>
                  <span
                    style={{
                      color: user?.role
                        ? "#dc3545"
                        : user?.vendor
                        ? "#2948ff"
                        : getStarting?.primaryColor,
                      padding: user?.role
                        ? "5px 17px"
                        : user?.vendor
                        ? "5px 15px"
                        : "5px 25px",
                    }}
                  >
                    {user?.role ? user?.role : user?.vendor ? "vendor" : "user"}
                  </span>
                </td>
                <td>
                  <Button
                    onClick={() => handleRemoveAdmin(user?._id)}
                    disabled={user?.email === currentUser?.email}
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
        </Table>
      </div>
    </div>
  );
};

export default ManageUsers;
