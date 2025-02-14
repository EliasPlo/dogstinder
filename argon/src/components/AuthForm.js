import React, { useState } from "react";
import { registerUser, verifyUser } from "../api/auth";
import { argon2id } from "hash-wasm";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  // Rekisteröi käyttäjä
  const handleRegister = async () => {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hashedPassword = await argon2id({
      password,
      salt,
      iterations: 3,
      memorySize: 65536,
      parallelism: 4,
      hashLength: 32,
      outputType: "hex",
    });

    try {
      await registerUser(username, hashedPassword, Array.from(salt));
      alert("Rekisteröinti onnistui!");
    } catch (error) {
      alert("Virhe rekisteröinnissä: " + error.message);
    }
  };

  // Tarkistaa käyttäjän kirjautumistiedot
  const handleVerify = async () => {
    try {
      const response = await verifyUser(username, verifyPassword);
      setVerificationResult(response.success);
    } catch (error) {
      alert("Kirjautumisvirhe: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Kirjautumisikkuna</h2>
      <input type="text" placeholder="Käyttäjänimi" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Salasana" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Rekisteröidy</button>
      <hr />
      <input type="password" placeholder="Salasana" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
      <button onClick={handleVerify}>Kirjaudu sisään</button>
      {verificationResult !== null && <p>{verificationResult ? "Kirjautuminen onnistui!" : "Virheellinen tunnus tai salasana"}</p>}
    </div>
  );  
}
