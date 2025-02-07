import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <h1>Tervetuloa Koira.png!</h1>
      <p>Paras sovellus koiranomistajille löytääkseen puistoja, tapahtumia ja paljon muuta.</p>
      <br />
        <p>Rekisteröidy tai kirjaudu sisään aloittaaksesi!</p>
            <a href="/signup">Sign Up</a>
            <a href="/login">Log In</a>
    </div>
  );
};

export default Home;
