// import React from 'react'

// function Prices() {
//   return (
//     <div style={{'display':'flex','flexDirection':'column', 'justifyContent':'center', 'alignContent':'center', 'margin':'20px'}}>
//         <div>
//        <h1 style={{'fontSize':'50px'}}> Calculate Prices of Bag</h1>
//        <form action="">
//         <input title='Enter number of bags' type="text" placeholder='hi' />
//        </form>
//        </div>

//     </div>
//   )
// }

// export default Prices

import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    // This will prevent page refresh
    e.preventDefault();

    // replace this with your own unique endpoint URL
    fetch("https://formcarry.com/s/XXXXXXX", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ email: email, message: message })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setSubmitted(true);
        } else {
          setError(res.message);
        }
      })
      .catch((error) => setError(error));
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (submitted) {
    return <p>We've received your message, thank you for contacting us!</p>;
  }

  return (
    <div style={{'backgroundColor':'RGB(244, 63, 94)'}} className="flex justify-center h-screen w-full">
    <div className="w-full max-w-xs flex flex-col justify-center align-middle">
    <div className="font-semibold text-4xl mb-9 text-center text-white">Calculate Price</div>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        
      <div className="mb-4 outline-6">
        
        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label> 
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
        <p  className="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div className="flex items-center justify-between">
        <Link
        href='/SignedInPassenger'
        >
        <button style={{'backgroundColor':'RGB(244, 63, 94)'}} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Sign In
        </button>
        </Link>
        <a style={{'textColor':'RGB(244, 63, 94)'}} className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div>
    </form>
    <p className="text-center text-white text-xs">
      &copy;2020 Acme Corp. All rights reserved.
    </p>
  </div>
  </div>
  );
}
