import React, { useState } from "react";

// Define navigation links as an array
const navLinks = [
  { text: "Home", href: "/", className: "hover:text-orange-500" },
  { text: "About Us", href: "#about", className: "hover:text-orange-500" },
  { text: "Gallery", href: "#", className: "hover:text-orange-500" },
  { text: "Blog", href: "#", className: "hover:text-orange-500" },
  { text: "FAQ", href: "#", className: "hover:text-orange-500" },
  { text: "Contact Us", href: "#", className: "hover:text-orange-500" },
];

// Social media background colors for hover effect
const socialMediaColors = {
  linkedin: "#0274b3",
  github: "#24262a",
  instagram: "linear-gradient(to bottom right, #405de6, #b33ab4, #fd1f1f)",
  youtube: "#ff0000",
};

// Social media links and icons
const socialLinks = [
  {
    href: "https://linkedin.com/",
    ariaLabel: "LinkedIn",
    social: "linkedin",
    bgColor: socialMediaColors.linkedin,
    svgPath:
      "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
    label: "LinkedIn",
  },
  {
    href: "https://www.github.com/",
    ariaLabel: "GitHub",
    social: "github",
    bgColor: socialMediaColors.github,
    svgPath:
      "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55 .38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8",
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/",
    ariaLabel: "Instagram",
    social: "instagram",
    bgColor: socialMediaColors.instagram,
    svgPath:
      "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
    label: "Instagram",
  },
  {
    href: "https://youtube.com/",
    ariaLabel: "Youtube",
    social: "youtube",
    bgColor: socialMediaColors.youtube,
    svgPath:
      "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z",
    label: "Youtube",
  },
];

const Footer = () => {
  // State to manage visibility of nav and description
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Toggle visibility on title click
  const handleTitleClick = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <footer className="bg-black text-white mt-8 sm:mt-10 py-6 sm:py-8 md:py-10 lg:py-12 flex-shrink-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
        {/* Title */}
        <h2
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center justify-center gap-1 sm:gap-2 cursor-pointer transition-colors duration-300 hover:text-orange-500"
          onClick={handleTitleClick}
        >
          <span className="text-orange-500 text-lg sm:text-xl md:text-2xl lg:text-3xl">
            ⚡
          </span>
          Weather Cambodia
        </h2>

        {/* Description */}
        <p
          className={`text-gray-400 max-w-xs sm:max-w-sm md:max-w-md text-xs sm:text-sm md:text-base lg:text-lg ${
            isNavVisible ? "" : "hidden"
          } text-center`}
        >
          It is a long established fact that a reader will be distracted by the
          readable content of a page looking at its layout.
        </p>

        {/* Social Media Links */}
        <ul
          className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5"
          id="social-list"
        >
          {socialLinks.map((link, index) => (
            <li key={index} className="relative group list-none">
              <a
                href={link.href}
                aria-label={link.ariaLabel}
                data-social={link.social}
                className="relative overflow-hidden flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full text-gray-600 bg-white transition-all duration-300 ease-in-out hover:text-white hover:shadow-[3px_2px_45px_0px_rgba(0,0,0,0.12)]"
              >
                <div
                  className="filled absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full"
                  style={{ background: link.bgColor }}
                ></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                  viewBox="0 0 16 16"
                >
                  <path d={link.svgPath}></path>
                </svg>
              </a>
              <div
                className="absolute -top-5 sm:-top-6 md:-top-7 lg:-top-8 left-1/2 -translate-x-1/2 text-white py-1 px-1.5 sm:py-1 sm:px-2 md:py-1.5 md:px-2.5 lg:py-2 lg:px-3 rounded-md opacity-0 invisible text-xs sm:text-xs md:text-sm lg:text-base transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:-top-8 sm:group-hover:-top-10 md:group-hover:-top-12 lg:group-hover:-top-14"
                style={{ background: link.bgColor }}
              >
                {link.label}
              </div>
            </li>
          ))}
        </ul>

        {/* Navigation */}
        <nav
          className={`flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 text-xs sm:text-sm md:text-base lg:text-lg ${
            isNavVisible ? "" : "hidden"
          }`}
        >
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`${link.className} px-1 sm:px-2 py-1 hover:underline transition-colors duration-300`}
            >
              {link.text}
            </a>
          ))}
        </nav>

        {/* Footer Bottom */}
        <div className="w-full mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-gray-500 border-t-2 border-gray-800 pt-3 sm:pt-4 md:pt-5 lg:pt-6 text-xs sm:text-sm md:text-base lg:text-base text-center">
          © 2025 - All Rights Reserved | Created By Phoungvisal
        </div>
      </div>
    </footer>
  );
};

export default Footer;
