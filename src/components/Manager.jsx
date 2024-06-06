import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type === "text";
    if (ref.current.src.includes("eye.png")) {
      ref.current.src = "/icons/delete.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "/icons/eye.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = (e) => {
    console.log(form);
    if (form.site === "" || form.username === "" || form.password === "") {
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (form.password.length < 4) {
      toast.error("Password must be at least four characters long", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    console.log([...passwordArray, form]);
    setform({ site: "", username: "", password: "" });
    toast.success("Password Saved!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const deletePassword = (id) => {
    let passwords = passwordArray.filter((item) => item.id !== id);
    let confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;
    setpasswordArray(passwords);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    toast.success("Password deleted!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleChange = (e) => {
    setform((prev) => {
      return { ...form, [e.target.name]: e.target.value };
    });
  };

  const copyText = (text) => {
    toast.success("Copied to clipboard", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const editPassword = (id) => {
    setform(passwordArray.find((item) => item.id === id));
    let passwords = passwordArray.filter((item) => item.id !== id);
    setpasswordArray(passwords);
    // localStorage.setItem("passwords", JSON.stringify(passwords));
  };

  return (
    <>
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className=" p-2 md:mycontainer min-h-[60vh] font">
        <h1 className="text-4xl font-extralight text-center">
          <span className="text-Black font-extrabold">&lt;Pass</span>
          Fortress
          <span className="text-black font-extrabold">/ &gt;</span>
        </h1>
        <p className="text-black text-lg text-center">
          Welcome to PassFortress - Your ultimate password manager. Securely
          store, manage, and access all your passwords in one place. Simplify
          your digital life with PassFortress.
        </p>
        <div className="flex items-center flex-col p-4 text-black gap-3">
          <input
            name="site"
            onChange={handleChange}
            value={form.site}
            placeholder="Enter website URL"
            className="rounded-full border border-black w-full p-4 py-1"
            type="text"
            id="1"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-3">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-black w-full p-4 py-1"
              type="text"
              id="2"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-black w-full p-4 py-1"
                type="password"
                id="3"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="/icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            onChange={handleChange}
            className="flex justify-center items-center bg-transparent hover:bg-slate-200 rounded-full px-8 py-2 w-fit gap-4 border border-black"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords </h2>
          {passwordArray.length === 0 && <div>No Passwords Saved</div>}
          {passwordArray.length > 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-black text-white">
                <tr className>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-slate-200">
                {passwordArray.map((item) => {
                  return (
                    <tr className="border-b border-green-500">
                      <td className="py-2 border border-white text-center w-32 ">
                        <div className="flex mx-3 justify-center">
                          <a href={item.site} target="_black">
                            {item.site}
                          </a>
                          <img
                            className="cursor-pointer mx-2 w-5 h-5"
                            onClick={() => {
                              copyText(item.site);
                            }}
                            src="icons/copy.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex mx-3 justify-center">
                          {item.username}
                          <img
                            className="cursor-pointer mx-2 w-5 h-5"
                            onClick={() => {
                              copyText(item.username);
                            }}
                            src="icons/copy.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex mx-3 justify-center">
                          {item.password}
                          <img
                            className="cursor-pointer mx-2 w-5 h-5"
                            onClick={() => {
                              copyText(item.password);
                            }}
                            src="icons/copy.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex mx-3 justify-center">
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/wuvorxbv.json"
                              trigger="hover"
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
