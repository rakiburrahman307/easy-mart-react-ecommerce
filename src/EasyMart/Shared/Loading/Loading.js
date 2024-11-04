import React, { useState } from 'react';
import "./Loading.css";

const Loading = () => {
    const [preloader, setPreloader] = useState(true);
    window.addEventListener("load", () => {
        setPreloader(false)
    });

    return (
        <>
            <div style={{display:preloader ? "block" : "none"}} className="loading"></div>
        </>
    );
};

export default Loading;