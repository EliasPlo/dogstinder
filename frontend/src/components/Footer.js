import React from 'react';
import styled from 'styled-components';
const Navbar = styled.nav`
  background-color: #333;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
  }

  li {
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: white;
    transition: color 0.3s;

    &:hover {
      color: #00bcd4;
    }
  }

  .logo {
    font-size: 1.5em;
    font-weight: bold;
    width: 20%;
  }
`;

const Footer = () => {
  return (
    <Navbar>
        <ul>
            <a href="/">Koti</a>
            <a href="/parks">PuistoKartta</a>
            <a href="/events">Tapahtumat</a>
            <a href="/settings">Asetukset</a>
            <a href="/profile">Profiili</a>
            <a href="/admin/auth">Admin</a>
        </ul>
      <p>&copy; 2025 Koira.png - All Rights Reserved</p>
    </Navbar>
  );
};

export default Footer;