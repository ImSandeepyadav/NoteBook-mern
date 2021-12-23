import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

     const [credentials, setCredentials] = useState({email: "", password: ""})
     const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
            const response = await fetch("http://localhost:5000/api/auth/login", {
              method:'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({email: credentials.email, password: credentials.password})
            });
            const json = await response.json();
            if(json.success){
                localStorage.setItem('token', json.authtoken);
                props.showAlert("Logged in Successfully ", "success")
                navigate("/")
            }
            else{
                props.showAlert("Invalid Details", "danger")
            }
          }

          const onChange = (e)=>{
             setCredentials({...credentials, [e.target.name]: e.target.value})
          }

    return (
        <div className='mt-3'>
            <h2>Login NoteBook</h2>
             <form onSubmit={handleSubmit}>
            <div className="mt-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp"/>
            </div>
            <div className="mt-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password"/>
            </div>
            <button type="submit" className="btn btn-outline-success mt-3" >Submit</button>
            </form>
        </div>
    )
}

export default Login
