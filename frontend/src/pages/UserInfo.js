import React, { useState, useEffect } from 'react';

const UserInfo = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Oletetaan, että käytämme APIa, joka palauttaa käyttäjätiedot käyttäjänimen perusteella
        const response = await fetch(`http://localhost:5000/api/users`);
        if (!response.ok) {
          throw new Error('Käyttäjätietoja ei löytynyt');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  if (loading) {
    return <div>Ladataan käyttäjätietoja...</div>;
  }

  if (error) {
    return <div>Virhe: {error}</div>;
  }

  return (
    <div>
      {userData ? (
        <div>
          <h2>Käyttäjätiedot</h2>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>rooli:</strong> {userData.role}</p>
          {/* Lisää haluamasi tiedot */}
        </div>
      ) : (
        <div>Käyttäjätietoja ei löytynyt.</div>
      )}
    </div>
  );
};

export default UserInfo;
