import React from "react";

function PorterFound() {
  return (
    <>
      <div
        style={{ backgroundColor: "RGB(244, 63, 94)" }}
        className="flex flex-col justify-center items-center min-h-screen  w-full"
      >
        <h1 className="my-5 text-4xl font-semibold text-white">
          Porter Found!
        </h1>
        <div className="bg-white py-8 px-4 rounded-xl flex">
          <div className=" text-sm flex flex-col gap-3">
            <p>Porter Name - Sundar Lal</p>
            <p>Location - Platform 1, RMKP</p>
            <p>ETA - 6 Minutes</p>
            <p>Porter Number - 120068</p>
            <p>Phone Number - +91 7999722712</p>
          </div>
          <img
            className="w-20 h-20 rounded-full"
            src="https://thumbs.dreamstime.com/z/jongensavatar-ronde-die-webknoop-op-wit-wordt-ge%C3%AFsoleerd-105543227.jpg?w=768"
            alt="Rounded avatar"
          />
        </div>
      </div>
    </>
  );
}

export default PorterFound;
