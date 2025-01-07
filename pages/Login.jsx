import React from "react";
import {
  useLoaderData,
  useNavigate,
  redirect,
  Form,
  useActionData,
  useNavigation,
} from "react-router";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    const resp = redirect(pathname);
    resp.body = true;
    return resp;
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  const error = useActionData();
  const message = useLoaderData();
  const navigate = useNavigation();

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {error && <h3 className="red">{error}</h3>}

      <Form method="post" className="login-form" replace>
        <input
          name="email"
          type="email"
          placeholder="Email address"
          defaultValue={"b@b.com"}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          defaultValue={"p123"}
        />
        <button disabled={navigate.state === "submitting"}>
          {navigate.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
