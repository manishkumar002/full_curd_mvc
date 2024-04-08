


import React from 'react';
import "../styles/Reset.css";
import { useState } from "react"
const Newsubmit = () => {
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log(otp, password);
    
        fetch('http://localhost:8000/api/submitotp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                otp: otp,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.code === 200) {
                alert('Password Updated.');
            } else {
                alert('Server error / wrong OTP');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
    return (
        <>
           
                        <section>
                            <div className="form_data">
                                <div className="form_heading">
                                <h1>New OTP</h1>
                                </div>

                                <form>
                        <div className="form_input">
                        <label htmlFor="text">OTP</label>
                        <input
                    style={{ marginBottom: '15px' }}
                    onChange={(e) => {
                        setOtp(e.target.value)
                    }}
                    value={otp}
                    className="inputs"
                    type="text"
                />
                            <label htmlFor="password">New Password</label>
                            <input
                    style={{ marginBottom: '15px' }}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    value={password}
                    className="inputs"
                    type="text"
                />
                        </div>

                        <button className='btn' onClick={handleSubmit}>change password</button>
                    </form>
                               
                            </div>
                        </section>
                    </>
          
    )
}

export default Newsubmit;