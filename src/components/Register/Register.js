import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();


    const history = useHistory();

    const handleSubmit = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const repeatPassword = repeatPasswordRef.current.value;
        const newUser = { name, email, password, repeatPassword }
        console.log(newUser)
        if (name && email && password && (password === repeatPassword)) {
            fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(data => {
    
                    alert('Your registration is successful');
                    history.push('/')


                })
        }
        else {
            alert('Invalid Input')
        }

        e.preventDefault();
    }

    return (
        <div className='w-50 mx-auto mt-5  pt-3 '>
            <div className='shadow p-5'>
                <h1 className='mb-4'>Sign Up</h1>

                <form onSubmit={handleSubmit} action="">
                    <input ref={nameRef} className='form-control' type="text" placeholder='Your name' /><br />
                    <input ref={emailRef} className='form-control' type="email" placeholder='Your Email' /><br />
                    <input ref={passwordRef} className='form-control' type="password" placeholder='Password' /><br />
                    <input ref={repeatPasswordRef} className='form-control' type="password" placeholder='Repeat Password' /><br />
                    <input className='form-control btn btn-primary' type="submit" value="Submit" />
                </form>
                <h5 className='mt-3'> Already an account ? <Link to='/login'>Login</Link></h5>
            </div>
        </div>
    );
};

export default Register;