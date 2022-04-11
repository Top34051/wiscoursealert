import React from "react";
import Logo from "../images/logo3-edit.png";
import Contact from "../components/contact";
import { useState } from "react";

const Complete = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <nav className="px-[4vw] h-[10vh] flex items-center">
          <img
            className="h-[6vmin] bg-gray-200 rounded-lg p-[1vmin]"
            src={Logo}
            alt="logofull"
          />
        </nav>
        <div className="flex flex-grow flex-col items-center justify-center w-full ">
          <div className="flex flex-col px-[7vw]">
            <p className="text-[8vmin] font-bold text-gray-600">
              Your registration is
              <br />
              completed!
            </p>
            <p className="text-[3vmin] mt-14 text-gray-400">
              Please check your email for the link to the subscription management portal.
              <br />
              The link can be used anytime in this semester.
            </p>
          </div>
        </div>
        <div className="flex justify-center mb-5">
          <button
            className="text-[2vmin] font-medium text-blue-600 hover:text-blue-700"
            onClick={() => setOpen(true)}
          >
            Contact us!
          </button>
        </div>
      </div>
      <Contact open={open} setOpen={setOpen} />
    </>
  );
};

export default Complete;
