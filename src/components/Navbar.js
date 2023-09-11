import React from 'react';
import styled from 'styled-components';
import logo from '../images/githublogo.png'
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const isUser =   isAuthenticated && user;
  console.log(user);
  return (
   <Wrapper>
    <div className="left-section">
      <img src={logo} alt="GitHub Logo" />
      <h4>Search GitHub User</h4>
    </div>
    {isUser && user.name && <h4>Welcome, <strong>{user.name.toUpperCase()}</strong></h4>}
    {
      isUser ? (
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
      ) : (<button onClick={loginWithRedirect}>Login</button>)
    }
  </Wrapper>
  )
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: #333;
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  .left-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  h4 {
    margin-bottom: 0;
    font-weight: 400;
    color:white;
  }
  img {
    width: 35px !important;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: #0078d4;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #0058a3;
    }
  }
`;

export default Navbar;
