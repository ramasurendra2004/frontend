
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch welcome message
        const homeResponse = await fetch("http://127.0.0.1:8000");
        if (!homeResponse.ok) {
          throw new Error("Failed to fetch welcome message");
        }
        const homeData = await homeResponse.json();
        setMessage(homeData);

        // Fetch user details
        const userResponse = await fetch(
          "http://127.0.0.1:8000/users"
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await userResponse.json();
        setUser(userData);
      } catch (err) {
        setError(err.message + ". Check whether FastAPI is running.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1>FastAPI + React</h1>

      {loading && <p>Loading data...</p>}

      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <h2>{message}</h2>

          {user && (
            <div style={styles.card}>
              <h3>User Details</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>City:</strong> {user.city}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "40px",
  },
  card: {
    maxWidth: "350px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  error: {
    color: "red",
  },
};

export default App;
