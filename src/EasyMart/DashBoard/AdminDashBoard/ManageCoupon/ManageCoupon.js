import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./ManageCoupon.css";
import useAuth from "../../../hooks/useAuth";
import getBaseUrl from "../../../hooks/getBaseUrl";

const ManageCoupon = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { getStarting } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch the single coupon document from the collection
    fetch(`${getBaseUrl()}/coupon`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          // Populate form with fetched data
          setValue("code", data.code);
          setValue("discountPercentage", data.discountPercentage);
          setValue("isActive", data.isActive.toString());
        }
      })
      .catch((error) => console.error("Error fetching coupon:", error))
      .finally(() => setLoading(false));
  }, [setValue]);

  const onSubmit = (data) => {
    const couponObject = {
      code: data.code,
      discountPercentage: parseInt(data.discountPercentage),
      isActive: data.isActive === "true",
    };

    fetch(`${getBaseUrl()}/coupon/apply`, {
      method: "PUT", // Always updating since there's only one document
      headers: { "content-type": "application/json" },
      body: JSON.stringify(couponObject),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Coupon Updated Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          reset();
        }
      })
      .catch((error) => {
        console.error("Error updating coupon:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to Update Coupon",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <div className="easy-mart-manage-coupon">
      <style type="text/css">
        {`
          .easy-mart-manage-coupon input,
          .easy-mart-manage-coupon select {
            border: 1px solid ${getStarting?.primaryColor};
            color: ${getStarting?.primaryColor};
            margin-bottom: 10px;
            padding: 8px;
            border-radius: 4px;
            width: 100%;
          }
          .easy-mart-manage-coupon input:focus,
          .easy-mart-manage-coupon select:focus {
            border: 1px solid ${getStarting?.primaryColor};
            box-shadow: none;
            outline: none;
          }
          .easy-mart-manage-coupon button {
            background-color: ${getStarting?.primaryColor};
          }
        `}
      </style>
      <h2 className="text-center py-1" style={{ color: getStarting?.primaryColor }}>
        Manage Coupon
      </h2>
      {loading ? (
       <div className="d-flex justify-content-center align-items-center" style={{ color: getStarting?.primaryColor }}>
       <p>Loading...</p>
     </div>
     
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
          {/* Coupon Code */}
          <input
            placeholder="Enter Coupon Code"
            {...register("code")}
            required
          />

          {/* Discount Percentage */}
          <input
            type="number"
            placeholder="Enter Discount Percentage"
            {...register("discountPercentage")}
            required
            min="0"
            max="100"
          />

          {/* Active/Inactive Dropdown */}
          <select {...register("isActive")} required>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          {/* Submit Button */}
          <button type="submit" className="btn w-100 text-white mt-3">
            Update Coupon
          </button>
        </form>
      )}
    </div>
  );
};

export default ManageCoupon;
