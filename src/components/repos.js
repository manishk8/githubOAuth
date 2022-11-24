import React, {useEffect, useState} from 'react';
import {Activities} from './activities';
import {RepoList} from './repoList';

const Repos = (props) => {
    const loginUser = props.loginUser;
    const authToken = props.authToken;

    const [repoList, setRepoList] = useState([]);
    const [activityData, setActivityData] = useState([]);
    const [showActivity, setShowActivity] = useState(false);

    useEffect(() => {
        if(loginUser && loginUser.length > 0) {
          fetch(`https://api.github.com/users/${loginUser}/repos`)
            .then((res) => res.json())
            .then((json) => {
                setRepoList(json)
            }).catch(err => {
              console.log(err)
            })
        }
      }, [loginUser])

      const handleActivity = (repoName) => {
        fetch(`https://api.github.com/users/${loginUser}/subscriptions`, { 
            method: 'get', 
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        })
        .then((res) => res.json())
        .then((json) => {
            setShowActivity(true)
            setActivityData(json.filter(v => v.name === repoName)[0])
        }).catch(err => {
          console.log(err)
        })
      }

    return (
        <div className='main'>
          <div className='header'>
            <p className='logo'>Esay Code App <span onClick={props.handleLogOut}>{`(Log Out)`}</span></p>
            <p className='username'>{props.loginDetail.name}<span><img src={props.loginDetail.avatar_url} alt='name' /></span></p>
          </div>
          {showActivity === true ?
              <Activities activityData={activityData} setShowActivity={setShowActivity} />
              :
              <RepoList handleActivity={handleActivity} repoList={repoList} />
          }
        </div>
    )
}

export default Repos;