import { useEffect, useState } from "react";
import { getIdToken } from "./auth/auth";
import {
  signInWithRedirect,
  signOut,
  fetchAuthSession,
} from "aws-amplify/auth";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const session = await fetchAuthSession();
      if (session.tokens) {
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  const handleSend = async () => {
  try {
    const token = await getIdToken();
    
    const apiUrl = `${import.meta.env.VITE_API_URL}/generate-image`;
    
    console.log('=== REQUEST DEBUG ===');
    console.log('API URL:', apiUrl);
    console.log('Token exists:', !!token);
    console.log('Token preview:', token?.substring(0, 30) + '...');
    console.log('Prompt:', prompt);

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });

    console.log('=== RESPONSE DEBUG ===');
    console.log('Status:', res.status);
    console.log('Status Text:', res.statusText);
    console.log('Headers:', Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error body:', errorText);
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    console.log('Success! Response:', data);
    setResponse(data);
    
  } catch (err) {
    console.error('=== ERROR ===', err);
    setResponse({ error: err.message });
  }
};

  if (loading) {
    return (
      <div className="page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="page">
      {isAuthenticated && (
    <>
      <button className="logout-btn" onClick={signOut}>
        Logout
      </button>

      
    </>
)}

      {!isAuthenticated ? (
        /* -------- LANDING PAGE -------- */
        <div className="card">
          <h1 className="title">AI Image App</h1>
          <button
            className="primary-btn"
            onClick={() => signInWithRedirect()}
          >
            Login
          </button>
          <button
            className="secondary-btn"
            onClick={() =>
              signInWithRedirect({
                options: { screenHint: "signup" },
              })
            }
          >
            Sign Up
          </button>
        </div>
      ) : (
        /* -------- APP PAGE -------- */
        <div className="chat-card">
          <h1 className="title">AI Image App</h1>
          <textarea
            className="chat-input"
            placeholder="Describe what you want to do with the image (e.g., remove background, make it white)..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="primary-btn" onClick={handleSend}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
