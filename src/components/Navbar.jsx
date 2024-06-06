import React from "react";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/register';
  };
  return (
    <nav className="bg-slate-100  text-black ">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14  -z-10 ">
        
          <div className="flex gap-5">
            <img className='w-10' src="./icons/logo.png" alt="logo" />
            <div className="logo font-extralight text-2xl">
        <span className="text-black font-arvo-regular-italic font-serif">&lt;Pass</span>
            Fortress
            <span className="text-black font-serif">/ &gt;</span>
            
            </div>
          </div>

        <button className="text-white bg-black my-5 rounded-full flex justify-between items-center ring-white ring-1">
            <img className='invert p-1 w-10 rounded-full' src="./icons/github.png" alt="github logo" />
            <span className="font-bold px-2">Github</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
