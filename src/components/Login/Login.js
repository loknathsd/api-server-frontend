import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Login = ({ setLoggedInUser }) => {

    const history = useHistory();
    const location = useLocation()

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleLogin = e => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const loginUser = { email, password }

        fetch('http://localhost:5000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data && password === data.password) {
                    alert('LOGIN SUCCESSFUL')
                    history.push('/');
                    

                }
                else {
                    alert(' You are not registered , please SignUp')
                    history.push('/register')
                }
               
                setLoggedInUser(data)

            })

        e.preventDefault();

    }



    return (
        <div className='w-50 m-auto mt-5 pt-5'>
            <div className='shadow p-5 '>
                <h1 className='mb-4'>Login</h1>

                <form onSubmit={handleLogin} action="">
                    <input ref={emailRef} className='form-control' type="text" placeholder='Email' required /><br />
                    <input ref={passwordRef} className='form-control' type="password" placeholder='Password' required /><br />
                    <button className='btn btn-primary'>Login</button><br />
                </form>
                <h6 className='mt-3'>New User ? <Link to="/register">SignUp</Link></h6>
            </div>

        </div>
    );
};

export default Login;