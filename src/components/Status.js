import React, { useEffect, useState } from "react";
const Status = () => {
    const [status,setStatus] = useState({})
    useEffect(()=>{
            setStatus({score:localStorage.getItem('score'),timing:localStorage.getItem('timing')});
    },[])
    return ( 
        <article className='status'>
            <h1 className="TXT-heading"> BEST STATUS </h1>
            <div>
                <p className='score TXT-heading2'>score</p>
                <h2 className='score TXT-number'>{status.score||'0'}</h2>
            </div>
            <div>
                <p className='timing TXT-heading2'>timing</p>
                <h2 className='timing TXT-number'>{status.timing||'0.0'}</h2>
            </div>
        </article>
    );
}

export default Status;