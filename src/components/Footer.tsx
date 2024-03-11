import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  const socialMediaIcons = [
    { icon: <FaFacebookF />, name: "Facebook" },
    { icon: <FaInstagram />, name: "Instagram" },
    { icon: <FaTwitter />, name: "Twitter" },
  ];

  const footerLinks = [
    { text: "Terms Of Use", link: "#" },
    { text: "Privacy Policy", link: "#" },
    { text: "FAQ", link: "#" },
  ];

  return (
    <footer className="bg-gray-800 w-full text-white font-semibold py-10 mt-10">
      <ul className="flex flex-wrap justify-center gap-4 md:gap-8 mb-5 md:mb-10">
        {footerLinks.map((link, index) => (
          <li
            key={index}
            className="transition-all cursor-pointer text-xs md:text-base hover:text-pink"
          >
            <a href={link.link}>{link.text}</a>
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-4">
        {socialMediaIcons.map((socialMedia, index) => (
          <span
            key={index}
            className="w-12 h-12 flex cursor-pointer items-center justify-center rounded-full bg-black transition-all hover:shadow-pink"
            title={socialMedia.name}
          >
            {socialMedia.icon}
          </span>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
