import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import manIcon from "../../../images/man.webp";
import "./Dashboard.css";

const Dashboard = () => {
  document.title = "Dashboard";

  const { logOut, getStarting, user, admin, vendorUser } = useAuth();
  const [selectedButton, setSelectedButton] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    setSelectedColor(
      `linear-gradient(to right, #fff 0%, ${getStarting?.primaryColor} 120%`
    );
  }, [selectedColor]);

  const handleLogoutButton = () => {
    logOut();
    setSelectedButton(13);
  };
  return (
    <Container>
      <div className='tmp-dashboard-container my-5'>
        <div className='tmp-dashboard-btn print-d-none'>
          <div className='customer-info'>
            <img src={manIcon} alt='' style={{ width: "20%" }} />
            <div>
              <span>Hello,</span>
              <h6>{user?.displayName || "User"}</h6>
            </div>
          </div>
          {!admin && (
            <div>
              <Link to='/dashboard'>
                <button
                  style={{
                    background: selectedButton === 1 ? selectedColor : "#fff",
                    color:
                      selectedButton === 1 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(1)}
                >
                  Dashbord
                </button>
              </Link>
              <br />
            </div>
          )}
          {admin && (
            <div>
              <Link to='/dashboard'>
                <button
                  style={{
                    background: selectedButton === 2 ? selectedColor : "#fff",
                    color:
                      selectedButton === 2 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(2)}
                >
                  Dashbord
                </button>
              </Link>
              <br />
              <Link to='/dashboard/manageorder'>
                <button
                  style={{
                    background: selectedButton === 3 ? selectedColor : "#fff",
                    color:
                      selectedButton === 3 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(3)}
                >
                  Manage ALL Orders
                </button>
              </Link>
              <br />
              <Link to='/dashboard/message'>
                <button
                  style={{
                    background: selectedButton === 4 ? selectedColor : "#fff",
                    color:
                      selectedButton === 4 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(4)}
                >
                  Received Message
                </button>
              </Link>
              <br />
              <Link to='/dashboard/addproducts'>
                <button
                  style={{
                    background: selectedButton === 5 ? selectedColor : "#fff",
                    color:
                      selectedButton === 5 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(5)}
                >
                  Add Products
                </button>
              </Link>
              <br />
              <Link to='/dashboard/manageproducts'>
                <button
                  style={{
                    background: selectedButton === 6 ? selectedColor : "#fff",
                    color:
                      selectedButton === 6 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(6)}
                >
                  Manage Products
                </button>
              </Link>
              <br />
              <Link to='/dashboard/managecategories'>
                <button
                  style={{
                    background: selectedButton === 7 ? selectedColor : "#fff",
                    color:
                      selectedButton === 7 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(7)}
                >
                  Manage Categories
                </button>
              </Link>
              <br />
              <Link to='/dashboard/managebrands'>
                <button
                  style={{
                    background: selectedButton === 8 ? selectedColor : "#fff",
                    color:
                      selectedButton === 8 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(8)}
                >
                  Manage Brands
                </button>
              </Link>
              <br />
              <Link to='/dashboard/managevendors'>
                <button
                  style={{
                    background: selectedButton === 9 ? selectedColor : "#fff",
                    color:
                      selectedButton === 9 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(9)}
                >
                  Manage Vendors
                </button>
              </Link>
              <br />
              <Link to='/dashboard/manageuser'>
                <button
                  style={{
                    background: selectedButton === 10 ? selectedColor : "#fff",
                    color:
                      selectedButton === 10
                        ? getStarting?.primaryColor
                        : "#000",
                  }}
                  onClick={() => setSelectedButton(10)}
                >
                  Manage Users
                </button>
              </Link>
              <br />
              <Link to='/dashboard/makeadmin'>
                <button
                  style={{
                    background: selectedButton === 11 ? selectedColor : "#fff",
                    color:
                      selectedButton === 11
                        ? getStarting?.primaryColor
                        : "#000",
                  }}
                  onClick={() => setSelectedButton(11)}
                >
                  Make Admin
                </button>
              </Link>
              <Link to='/dashboard/coupon'>
                <button
                  style={{
                    background: selectedButton === 14 ? selectedColor : "#fff",
                    color:
                      selectedButton === 14
                        ? getStarting?.primaryColor
                        : "#000",
                  }}
                  onClick={() => setSelectedButton(14)}
                >
                  Manage Coupon
                </button>
              </Link>
              <br />
            </div>
          )}

          {vendorUser?.vendor && (
            <div>
              <Link to='/dashboard/manageorder'>
                <button
                  style={{
                    background: selectedButton === 2 ? selectedColor : "#fff",
                    color:
                      selectedButton === 2 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(2)}
                >
                  Manage ALL Orders
                </button>
              </Link>
              <br />
              <Link to='/dashboard/addproducts'>
                <button
                  style={{
                    background: selectedButton === 3 ? selectedColor : "#fff",
                    color:
                      selectedButton === 3 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(3)}
                >
                  Add Products
                </button>
              </Link>
              <br />
              <Link to='/dashboard/manageproducts'>
                <button
                  style={{
                    background: selectedButton === 4 ? selectedColor : "#fff",
                    color:
                      selectedButton === 4 ? getStarting?.primaryColor : "#000",
                  }}
                  onClick={() => setSelectedButton(4)}
                >
                  Manage Products
                </button>
              </Link>
              <br />
            </div>
          )}

          <Link to='/dashboard/account'>
            <button
              style={{
                background: selectedButton === 12 ? selectedColor : "#fff",
                color:
                  selectedButton === 12 ? getStarting?.primaryColor : "#000",
              }}
              onClick={() => setSelectedButton(12)}
            >
              My Account
            </button>
          </Link>
          <br />
          <Link to='/login'>
            <button
              onClick={handleLogoutButton}
              style={{
                background: selectedButton === 13 ? selectedColor : "#fff",
                color:
                  selectedButton === 13 ? getStarting?.primaryColor : "#000",
              }}
            >
              Logout <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </Link>
        </div>
        <div className='tmp-dashboard-info'>
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
