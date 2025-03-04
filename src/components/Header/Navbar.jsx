import React from "react";

const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent text-white shadow-none">
      <nav className="py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-[#EE7C27]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
              <a href="./Navbar.jsx" className="font-bold text-lg">
                Humidity
              </a>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-[#EE7C27]">
                Home
              </a>
              <a href="#" className="hover:text-[#EE7C27]">
                About Us
              </a>
              <a href="#" className="hover:text-[#EE7C27]">
                Gallery
              </a>
              <a href="#" className="hover:text-[#EE7C27]">
                Blog
              </a>
              <a href="#" className="hover:text-[#EE7C27]">
                FAQ
              </a>
              <a href="#" className="hover:text-[#EE7C27]">
                Contact
              </a>
            </div>
            <a
              href="#"
              className="bg-[#db9c27] hover:bg-[#EE7C27] transition-all duration-300 ease-in text-white px-4 py-2 rounded-2xl font-medium"
            >
              Get Info
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
