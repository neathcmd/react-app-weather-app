import React, { useState, useEffect } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to change background color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-[#EE7C27] backdrop-blur-md shadow-lg"
          : "bg-transparent shadow-none"
      } text-white`}
    >
      <nav className="py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-[#EE7C27] transition-transform duration-300 ease-in-out hover:scale-110"
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
            <a
              href="/"
              className="font-bold text-lg tracking-wide hover:text-[#EE7C27] transition-colors duration-300 ease-in-out"
            >
              Weather Cambodia
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {["Home", "About Us", "Gallery", "Blog", "FAQ", "Contact"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative text-sm lg:text-base font-medium hover:text-[#EE7C27] transition-colors duration-300 ease-in-out after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-[#EE7C27] after:left-0 after:bottom-[-4px] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link}
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden text-white focus:outline-none transition-transform duration-300 ease-in-out hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>

          {/* Get Info Button (Desktop) */}
          <a
            href="#get-info"
            className={`hidden md:inline-block px-4 py-2 rounded-2xl font-medium shadow-md transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#db9c27] focus:ring-offset-1 ${
              isScrolled
                ? "bg-white text-[#db9c27] border border-transparent hover:border-white backdrop-blur-md shadow-lg hover:bg-[#db9c27] hover:text-white hover:shadow-md"
                : "bg-[#db9c27] text-white hover:bg-white hover:text-[#db9c27] hover:shadow-lg"
            }`}
            aria-label="Get more information"
          >
            Get Info
          </a>
        </div>

        {/* Mobile Navigation Links (Slides in from the right with fade) */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#EE7C27]  backdrop-blur-md transform transition-all duration-500 ease-in-out z-50 ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white focus:outline-none transition-transform duration-300 ease-in-out hover:scale-110"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Menu Content */}
          <div className="mt-16 p-6 flex flex-col space-y-4">
            {["Home", "About Us", "Gallery", "Blog", "FAQ", "Contact"].map(
              (link, index) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={handleLinkClick}
                  className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:text-[#EE7C27] ${
                    isMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {link}
                </a>
              )
            )}
            <a
              href="#get-info"
              onClick={handleLinkClick}
              className="block px-4 py-3 bg-white text-[#EE7C27] border border-transparent hover:border-white hover:text-white hover:bg-[#EE7C27] transition-all duration-300 ease-in-out transform hover:scale-105 rounded-2xl font-medium shadow-md hover:shadow-lg"
            >
              Get Info
            </a>
          </div>
        </div>

        {/* Overlay for Mobile Menu */}
        {isMenuOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-500 ease-in-out"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
    </header>
  );
};

export default NavBar;
