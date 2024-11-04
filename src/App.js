import React, { Suspense, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import "./App.css";
import AuthProvider from "./EasyMart/context/AuthProvider";
const EasyMart = React.lazy(() => import("./EasyMart/assets/EasyMart"));

function App() {
  const [online, setOnline] = useState(navigator.onLine);

  const data = {
    address: "Mirpur, Dhaka, Bangladesh",
    companyName: "Easy-Mart",
    currency: "৳",
    deliveryCharge: 100,
    email: "easymart@gmail.com",
    logo: "https://i.ibb.co/Xk7sdfL/01.png",
    phone: "+8801730258276",
    primaryColor: "#009688"
  };
  localStorage.setItem("starting", JSON.stringify(data));
  const getStarting = JSON.parse(localStorage.getItem("starting"));

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setOnline(navigator.onLine);

      const retryButton = document.querySelector(".swal2-deny");
      if (retryButton && retryButton.textContent.trim() === "Retry") {
        const swalContainer = document.querySelector(".swal2-container");
        swalContainer.style.display = "none";
      }
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  const handleNoInternetConnection = () => {
    Swal.fire({
      position: "center",
      icon: "question",
      title: "No Internet?",
      text:
        "No Internet connection. Make sure Wi-Fi or cellular data is turned on, then try again",
      showConfirmButton: false,
      allowOutsideClick: false,
      denyButtonColor: "#ff2525",
      showDenyButton: true,
      denyButtonText: `Retry`
    }).then((result) => {
      window.location.reload();
    });
  };

  if (!online) {
    handleNoInternetConnection();
    return null;
  }

  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              color: `${getStarting?.primaryColor || "#157ed2"}`,
              width: "100vw",
              height: "100vh"
            }}
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner animation="border" />
          </div>
        }
      >
        <AuthProvider>
          <EasyMart />
        </AuthProvider>
      </Suspense>
    </>
  );
}

export default App;
