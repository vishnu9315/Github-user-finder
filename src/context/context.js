import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';
import { createContext } from 'react';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [requests, setRequest] = useState(0);
    const [error, setError] = useState({show:false, msg: ''})
    const [limits, setLimit] = useState(0);
    const [loading, setLoading] = useState(false);


    const checkRequest = async () => {
        const data = await axios.get(`${rootUrl}/rate_limit`) //inside data there is another object rate inside rate there is another object with three properties limit remaining etc.
        let { data : {rate: {remaining}} } = data;
        let { data : {rate: {limit}} } = data;
        setLimit(limit);
        setRequest(remaining);
        if(remaining === 0){
            toggleError(true, 'Oops, You have Exceeded your hourly limit. Try again after an hour..');
        }
       
    }

    const searchGithubUser = async (user) => {
       toggleError();
       setLoading(true);
       const response = await axios.get(`${rootUrl}/users/${user}`).catch(err => console.log(err));
       if(response){
        console.log(response.data);
        setGithubUser(response.data);
        const {login, followers_url} = response.data;
        //https://api.github.com/users/john-smilga/repos?per_page=100
        //https://api.github.com/users/john-smilga/followers
        await axios.get(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => 
            setRepos(response.data)
        )
        await axios.get(`${followers_url}?per_page=100`).then((response) => 
            setFollowers(response.data)
            
        );

       }else{
        toggleError(true, 'There is no user with that username..')
       }
       checkRequest(); //everytime time we are searching user we are calling checkRequest also to get the reamining limit
       setLoading(false);
    }

    const toggleError = (show = false, msg = '') => {
        setError({show, msg})
    }

    useEffect(() => {
        checkRequest();
    }, []);

    return <GithubContext.Provider value = {{githubUser, repos, followers,requests,error, searchGithubUser, limits, loading}}>
        {children}
    </GithubContext.Provider>
}

//Github provides proves the data to all the components while GithubContext is used to access all the data in the components
export {GithubContext, GithubProvider};