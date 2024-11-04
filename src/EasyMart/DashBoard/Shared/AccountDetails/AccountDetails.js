import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import useAuth from '../../../hooks/useAuth';
import './AccountDetails.css';

const Checkout = () => {
    const { getStarting, user, admin, vendorUser } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [createVendors, setCreateVendors] = useState(false);
    const [photoURL, setPhotoURL] = useState("");

    const [userInfo, setUserInfo] = useState({});
    const [ifVendor, setIfVendor] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => {
                const updateUser = data?.find(result => result.email === user.email);
                setUserInfo(updateUser);
                setIfVendor(updateUser?.vendor);
        })
        .catch((error) => {
            console.log(error)
        });
    }, [user])

    const onUserInformationUpdate = (data) => {
        const formData = new FormData();
        if(data.name){
            formData.append('name', data?.name);
            formData.append('email', data?.email);
            formData.append('phone', data?.phone);
            formData.append('website', data?.website);
            formData.append('address', data?.address);
            formData.append('status', true);
            formData.append('logo_url', photoURL);
            formData.append('phone', data?.phone);
        }

        let userData;
        if(data.name){
            data.vendor = true;
            data.vendors_name = data?.name;
            userData = data
        }
        else{
            userData = data
        }

        fetch(`http://localhost:5000/users/${data?._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(result => {
            if(result.modifiedCount > 0){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Information Updated Successfully',
                    showConfirmButton: false,
                    timer: 2000
                })
                setUserInfo(userData) 
            }

            fetch('http://localhost:5000/vendors', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(result => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Information Updated Successfully',
                    showConfirmButton: false,
                    timer: 2000
                })

                setIfVendor(false);
                setCreateVendors(false);
                setIfVendor(true);
                setPhotoURL("");
            })
            .catch((error) => {
                console.log(error)
            });

        })
        .catch((error) => {
            console.log(error)
        });
    };


   useEffect(() => {
    if(!userInfo)  return
    let tmp = {
        ...userInfo,
        _id: userInfo._id, 
        displayName: userInfo.displayName, 
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
    }
    reset(tmp)
},[userInfo, reset])


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
            <div className="tmp-account-container">
                <div className="tmp-account-inner">
                    <h2>Account Details</h2>
                    <hr />
                    <form onSubmit={handleSubmit(onUserInformationUpdate)}>
                        <input defaultValue={userInfo?._id} {...register("_id")} style={{display: 'none', border: `1px solid ${getStarting?.primaryColor}`}}/>
                        {
                            vendorUser?.vendor &&
                            <input defaultValue={vendorUser.vendors_name} placeholder="Enter Your Vendor Name *" {...register("vendors_name")} style={{border: `1px solid ${getStarting?.primaryColor}`, opacity: 0.5}} readOnly/>
                        }
                        <input defaultValue={userInfo?.displayName} placeholder="Enter Your Name *" {...register("displayName")} style={{border: `1px solid ${getStarting?.primaryColor}`, opacity: 0.5}} readOnly/>
                        <input defaultValue={userInfo?.email} placeholder="Enter Your Email *" {...register("email")} style={{border: `1px solid ${getStarting?.primaryColor}`, opacity: userInfo?.email ? 0.5 : 1}} readOnly={userInfo?.email && true}/>
                        <input defaultValue={userInfo?.phoneNumber} placeholder="Enter Your Phone *" {...register("phoneNumber")} style={{border: `1px solid ${getStarting?.primaryColor}`, opacity: userInfo?.phoneNumber ? 0.5 : 1}} readOnly={userInfo?.phoneNumber && true}/>
                        <input defaultValue={userInfo?.address} placeholder="Enter Your Address *" {...register("address")} style={{border: `1px solid ${getStarting?.primaryColor}`}}/>
                        
                        { ( !ifVendor && !admin) && 
                            <p onClick={() => setCreateVendors(!createVendors)} className="create-vendors" style={{color: getStarting?.primaryColor}}>Create Vendor</p>
                        }
                        
                        {
                            createVendors && <div>
                                <input type="file" onChange={handleImageUpload} defaultValue={photoURL} required/>
                                <input placeholder="Enter Vendor Name *" {...register("name")} style={{border: `1px solid ${getStarting?.primaryColor}`}}/>
                                <input placeholder="Enter Website Url *" {...register("website")} style={{border: `1px solid ${getStarting?.primaryColor}`}}/>
                            </div>
                        }
                        <input type="submit" value="Update Information" style={{backgroundColor: `${getStarting.primaryColor}`, border: `2px solid ${getStarting.primaryColor}`}}/>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Checkout;