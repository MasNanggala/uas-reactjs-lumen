import axios from "axios"
import React, { useState } from "react"
import Swal from "sweetalert2"

const Login = ({logedIn}) => {

    const [state, UpdateState] = useState({ credential : {
        username:'',
        password: ''
    }})

    const setState = data => {
        UpdateState(current => ({...current, ...data}))
    }

    const onInputChange = field => ({target}) => {
        credential[field] = target.value;
        setState(credential)
    }

    const onLoginClick = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Login Berhasil'
          })
        axios.post('http://localhost:8000/api/login', credential).then(res=>{
            if(res.data.status == 200){
                const access_token = res.data.access_token;
                //simpan ke local storage
                localStorage.setItem('access_token', access_token);
                axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
                logedIn(true);
            }
        }).catch(error=>{
            console.log('Error', error);
            logedIn(false)
        })
    }

    const {credential} = state;


    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="../../index2.html"><b>Nang's </b>Library</a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form method="post">
                            <div className="input-group mb-3">
                                <input value={credential.username} onChange={onInputChange('username')} type="email" className="form-control" placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input value={credential.password} onChange={onInputChange('password')} type="password" className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                </div>
                                {/* /.col */}
                                <div className="col-4">
                                    <button onClick={onLoginClick} type="button" className="btn btn-primary btn-block">Sign In</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </div>
    )
}

export default Login
