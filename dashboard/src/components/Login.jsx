import React, { useState } from "react";
import axios from "axios";
import { PageHeader, Box, Button, TextInput } from "@primer/react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // we'll create this file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("https://stocktrading-c41p.onrender.com/login", {
        username,
        password,
      });

      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        alert("Login successful!");
        navigate("/");
      } else {
        console.log(res.data);
        alert(res.data.error || "Login failed");
        
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Invalid username or password");
        console.log(e.message);
      } else {
        alert("Server error. Try again later.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <Box sx={{ padding: 3, textAlign: "center" }}>
          <PageHeader>
            <PageHeader.TitleArea variant="large">
              <PageHeader.Title>Sign In</PageHeader.Title>
            </PageHeader.TitleArea>
          </PageHeader>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <TextInput
                block
                name="username"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <TextInput
                block
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              block
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>

          <p className="signup-text">
            Don't have an account?{" "}
            <a href="https://project-git-main-nithishs-projects-80c0ca4f.vercel.app/signup">Sign up here</a>
          </p>
        </Box>
      </div>
    </div>
  );
};

export default Login;
