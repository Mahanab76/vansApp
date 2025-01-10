import React, { useContext, useState } from "react";
import {
  useLoaderData,
  useNavigate,
  redirect,
  Form,
  useActionData,
  useNavigation,
  Link,
} from "react-router";
import supabase from "../api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");
  const hadnleSubmit = async (event) => {
    event.preventDefault();
    setLoadingMsg("");
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      setLoadingMsg(error.message);
      return;
    }
    if (data) {
      setLoadingMsg("user Account created");
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="login-container">
      <h1>Register to VansLife</h1>
      {loadingMsg && <span>{loadingMsg}</span>}
      <Form onSubmit={hadnleSubmit} className="login-form" replace>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          required
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          required
          placeholder="Password"
        />
        <button>Sign up</button>
        {/* <button disabled={navigate.state === "submitting"}>
          {navigate.state === "submitting" ? "Logging in..." : "Log in"}
        </button> */}
        <span>Already have an Account?</span>
        <Link to="/login">Login</Link>
      </Form>
    </div>
  );
}
