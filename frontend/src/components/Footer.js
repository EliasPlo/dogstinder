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
            <a href="http://localhost:3000/">Koti</a>
            <a href="http://localhost:3000/parks">PuistoKartta</a>
            <a href="http://localhost:3000/events">Tapahtumat</a>
            <a href="http://localhost:3000/settings">Asetukset</a>
            <a href="http://localhost:3000/profile">Profiili</a>
        </ul>
      <p>&copy; 2025 Koira.png - All Rights Reserved</p>
    </Navbar>
  );
};

export default Footer;