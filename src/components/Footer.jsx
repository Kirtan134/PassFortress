import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-50 text-black flex flex-col justify-center items-center fixed bottom-0 w-full">
      <div className="flex gap-2">
        <img className="w-10" src="/icons/logo.png" alt="logo" />
        <div className="logo font-extralight text-2xl">
          <span className="text-black font-arvo-regular-italic font-serif">
            &lt;Pass
          </span>
          Fortress
          <span className="text-black font-serif">/ &gt;</span>
        </div>
      </div>
      <div>Created by Kirtan.</div>
    </div>
  );
};

export default Footer;
