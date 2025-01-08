// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import {
//   getFirestore,
//   getDoc,
//   doc,
//   collection,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCko7AgrMq0WnpfYUvUwMT2RRVEqgWn7fY",
//   authDomain: "vanlife-ace8b.firebaseapp.com",
//   projectId: "vanlife-ace8b",
//   storageBucket: "vanlife-ace8b.firebasestorage.app",
//   messagingSenderId: "1075485055375",
//   appId: "1:1075485055375:web:c549b610ef64982820d3fa",
// };
import { createClient } from "@supabase/supabase-js";
import { data } from "react-router";

const supabase = createClient(
  "https://ocoguozldfoijgxkgmha.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jb2d1b3psZGZvaWpneGtnbWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzMzgxNjUsImV4cCI6MjA1MTkxNDE2NX0.-e-Rmvlb3XGnfnX6GYoEaYsXBG_Z0IHlZLwLZs09mf8"
);
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const vansCollectionRef = collection(db, "vans");
// //auth
// const auth = getAuth(app);

// export async function getVans() {
//   const querySnapshot = await getDocs(vansCollectionRef);
//   const dataArr = querySnapshot.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   return dataArr;
// }
export async function getVans() {
  let { data: querySnapshot, error } = await supabase.from("vans").select("*");
  const dataArr = querySnapshot.map((doc) => ({
    ...doc,
    id: doc.id,
  }));
  return dataArr;
}
//supabase below didnt show items with no err
// export async function getVan(id) {
//   let { data: vanSnapshot, error } = await supabase
//     .from("vans")
//     .select()
//     .eq("id", `${id}`);
//   console.log(vanSnapshot);
//   return {
//     ...vanSnapshot,
//     id: vanSnapshot.id,
//   };
// }
export async function getVan(id) {
  let { data: vanSnapshot, error } = await supabase
    .from("vans")
    .select()
    .eq("id", `${id}`);
  const dataArr = vanSnapshot.map((doc) => ({
    ...doc,
    id: doc.id,
  }));
  return dataArr;
}

//for vanDetail page
// export async function getVan(id) {
//   const docRef = doc(db, "vans", id);
//   const vanSnapshot = await getDoc(docRef);
//   return {
//     ...vanSnapshot.data(),
//     id: vanSnapshot.id,
//   };
// }
export async function getHostVans() {
  let { data: querySnapshot, error } = await supabase
    .from("vans")
    .select()
    .eq("hostId", "123");
  const dataArr = querySnapshot.map((doc) => ({
    ...doc,
    id: doc.id,
  }));
  return dataArr;
}
// export async function getHostVans() {
//   const q = query(vansCollectionRef, where("hostId", "==", "123"));
//   const querySnapshot = await getDocs(q);
//   const dataArr = querySnapshot.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   return dataArr;
// }

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
//for using mirage server
// export async function getVans(id) {
//   const url = id ? `/api/vans/${id}` : "/api/vans";
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await res.json();
//   return data.vans;
// }
// export async function getHostVans(id) {
//   const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await res.json();
//   return data.vans;
// }
