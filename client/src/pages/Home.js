// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenue sur Garbis Express</h1>
      <Link to="/register">Inscription</Link>
      <br />
      <Link to="/login">Connexion</Link>
    </div>
  );
}

export default Home;