// import { useEffect, useState } from "react";
// import {
//   signInWithRedirect,
//   signOut,
//   fetchAuthSession,
// } from "aws-amplify/auth";
// import "./App.css";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [prompt, setPrompt] = useState("");

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   async function checkAuth() {
//     try {
//       const session = await fetchAuthSession();
//       if (session.tokens) {
//         setIsAuthenticated(true);
//       }
//     } catch {
//       setIsAuthenticated(false);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) {
//     return <div className="page"><h2 style={{ color: "white" }}>Loading...</h2></div>;
//   }

//   return (
//     <div className="page">
//       {isAuthenticated && (
//         <button className="logout-btn" onClick={signOut}>
//           Logout
//         </button>
//       )}

//       {!isAuthenticated ? (
//         /* -------- LANDING PAGE -------- */
//         <div className="card">
//           <h1 className="title">AI Image App</h1>

//           <button
//             className="primary-btn"
//             onClick={() => signInWithRedirect()}
//           >
//             Login
//           </button>

//           <button
//             className="secondary-btn"
//             onClick={() =>
//               signInWithRedirect({
//                 options: { screenHint: "signup" },
//               })
//             }
//           >
//             Sign Up
//           </button>
//         </div>
//       ) : (
//         /* -------- APP PAGE -------- */
//         <div className="chat-card">
//           <h1 className="title">AI Image App</h1>

//           <textarea
//             className="chat-input"
//             placeholder="Describe what you want to do with the image (e.g., remove background, make it white)..."
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//           />

//           <button className="primary-btn">Send</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
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

  const handleSend = () => {
    if (prompt.trim()) {
      console.log("Prompt:", prompt);
      // Add your API call or processing logic here
      setPrompt("");
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
        <button className="logout-btn" onClick={signOut}>
          Logout
        </button>
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
