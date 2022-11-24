import './App.css';
import Repos from './components/repos';
import Login from './components/login';
import { useEffect, useState } from 'react';

const CLIENT_ID = "ab38fc05857006b9182b";
const CLIENT_SECRECT = "893decf464fe4aef4d26ccf533180f5ae88306aa";

function App() {
  const [codeValue, setCodeValue] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [loginDetail, setLoginDetail] = useState('');

  useEffect(() => {
    const queryUrl = window.location.search;
    const urlParams = new URLSearchParams(queryUrl);
    const codeParams = urlParams.get("code")
    if(codeParams) {
      setCodeValue(codeParams)
    }
  }, [])

  useEffect(() => {
    if(codeValue && codeValue.length > 0) {
      fetch(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRECT}&code=${codeValue}`)
        .then((res) => res.text())
        .then((json) => {
          let accessToken = json.split('&')[0];
          accessToken = accessToken.split('=');
          if(accessToken[0] === 'access_token') {
            setAuthToken(accessToken[1])
            return fetch('https://api.github.com/user', { 
                method: 'get', 
                headers: {
                    Authorization: 'Bearer ' + accessToken[1]
                }
            }).then((res) => res.json())
            .then((json) => {
              setLoginUser(json.login);
              setLoginDetail(json);
          })
          }
          else {
            window.location.assign('http://localhost:3000');
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }, [codeValue])

  const loginWithGithub = () => {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  }

  const handleLogOut = () => {
    setAuthToken('')
    window.location.assign('http://localhost:3000');
  }

  return (
    <div className="App">
      {loginUser && loginUser.length > 0 ?
        <div className='wrapper'>
          <Repos loginUser={loginUser} authToken={authToken} loginDetail={loginDetail} handleLogOut={handleLogOut} />
        </div>
        :
        <div className='container'>
          <Login loginWithGithub={loginWithGithub} />
        </div>
      }
    </div>
  );
}

export default App;
