import React from 'react';
import useAuth from '../../hooks/useAuth';
import './ProductsTimeCounter.css';

const ProductsTimeCounter = ({hoursMinSecs}) => {
    const {getStarting} = useAuth();
    const { days = 0, hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[day, hrs, mins, secs], setTime] = React.useState([days, hours, minutes, seconds]);
    

    const tick = () => {
   
        if (day === 0 && hrs === 0 && mins === 0 && secs === 0) 
            reset()
        else if (hrs === 0 && mins === 0 && secs === 0) {
            setTime([day - 1, 59, 59, 59]);
        }else if (mins === 0 && secs === 0) {
            setTime([day, hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([day, hrs, mins - 1, 59]);
        } else {
            setTime([day, hrs, mins, secs - 1]);
        }
    };


    const reset = () => setTime([parseInt(days), parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    
    return (
        <div className="easy-mart-CountDownTimer">
            {/* <p>{`${day.toString().padStart(2, '0')}:
                ${hrs.toString().padStart(2, '0')}:
                ${mins.toString().padStart(2, '0')}:
                ${secs.toString().padStart(2, '0')}`}
            </p>  */}
            {/* <p>{`${day.toString().padStart(2, '0')}`} <br />days</p>
            <p>{`${hrs.toString().padStart(2, '0')}`} <br />Hours</p> 
            <p>{`${mins.toString().padStart(2, '0')}`} <br />Minutes</p> 
            <p>{`${secs.toString().padStart(2, '0')}`} <br />Seconds</p>  */}

            <div className="counter">
                <h6 style={{color: `${getStarting?.primaryColor}`}}>{`${day.toString().padStart(2, '0')}`}</h6>
                {/* <span>days</span> */}
            </div>
            <div className="counter">
                <h6 style={{color: `${getStarting?.primaryColor}`}}>{`${hrs.toString().padStart(2, '0')}`}</h6>
                {/* <span>Hours</span> */}
            </div>
            <div className="counter">
                <h6 style={{color: `${getStarting?.primaryColor}`}}>{`${mins.toString().padStart(2, '0')}`}</h6>
                {/* <span>Minutes</span> */}
            </div>
            <div className="counter">
                <h6 style={{color: `${getStarting?.primaryColor}`}}>{`${secs.toString().padStart(2, '0')}`}</h6>
                {/* <span>Seconds</span> */}
            </div>
        </div>
    );
}

export default ProductsTimeCounter;