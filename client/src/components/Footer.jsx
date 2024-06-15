import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <Link to="https://www.waco-texas.com/Home">City of Waco</Link>
      <Link to="https://www.facebook.com/profile.php?id=100069234258991">
        <FaFacebookSquare />
      </Link>
      <Link to="https://www.linkedin.com/in/john-fabiszewski-00b8322a9?trk=public_post_comment_actor-image">
        <FaLinkedin />
      </Link>
      <Link>solar-optic &copy; 2024</Link>
    </footer>
  );
};

export default Footer;
