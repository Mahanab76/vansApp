import React, { useContext, useState } from "react";
import {
  useLoaderData,
  useNavigate,
  redirect,
  Form,
  useActionData,
  useNavigation,
  Link,
  Navigate,
} from "react-router";
import supabase from "../api";
// import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}
//auth prev loginUser mirage
// export async function action({ request }) {

//   const formData = await request.formData();
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const pathname = new URL(request.url).searchParams.get("redirectTo") || "/";
//   try {
//     const data = await loginUser({ email, password });
//     localStorage.setItem("loggedin", true);
//     const resp = redirect(pathname);
//     resp.body = true;
//     return resp;
//   } catch (err) {
//     return err.message;
//   }
// }
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return error.message;
  }
  if (data) {
    localStorage.setItem("loggedin", true);
    const resp = redirect(pathname);
    return resp;
  }
}

export default function Login() {
  //auth supabase//anotherway
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loadingMsg, setLoadingMsg] = useState("");
  const [auth, setAuth] = useState(() => {
    const storedData = localStorage.getItem("loggedin");
    return storedData ? JSON.parse(storedData) : "initial value";
  });

  const erroraction = useActionData();
  const messagee = useLoaderData();
  const navigate = useNavigation();
  //anotherway
  // const hadnleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoadingMsg("");
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password,
  //   });
  //   if (error) {
  //     setLoadingMsg(error.message);
  //     return;
  //   }
  //   if (data) {
  //     redirect("host");
  //     return null;
  //   }
  //   setEmail("");
  //   setPassword("");
  // };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    localStorage.removeItem("loggedin");
    setAuth("initial value");
    const res = redirect("/login");
    return res;
  };
  if (auth === true) {
    return (
      <div className="login-container">
        <h1>Sign out from your account</h1>
        <button className="logoutbtn" onClick={signOut}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {messagee && <h3 className="red">{messagee}</h3>}
      {erroraction && <h3 className="red">{erroraction}</h3>}
      {/* {loadingMsg && <span>{loadingMsg}</span>} */}
      <Form method="post" className="login-form" replace>
        <input
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          required
          placeholder="Email"
        />
        <input
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          required
          placeholder="Password"
        />
        <button disabled={navigate.state === "submitting"}>
          {navigate.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
        <span>Dont have an Account?</span>
        <Link to="/signin">Register</Link>
      </Form>
    </div>
  );
}
