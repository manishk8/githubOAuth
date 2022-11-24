import React from 'react';

const Login = (props) => {
    return(
        <div className='login'>
            <h1>Welcome</h1>
                <button onClick={() => props.loginWithGithub()}>Login With Github</button>
        </div>
    )
}

export default Login;