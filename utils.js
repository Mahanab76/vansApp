import { redirect } from "react-router";

// export async function requireAuth() {
//   const isLoggedIn = false;

//   if (!isLoggedIn) {
//     throw redirect("/login");
//   }
// }
export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("loggedin");
  if (!isLoggedIn) {
    const response = redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
    response.body = true;
    throw response;
  }
  return null;
}
