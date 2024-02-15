import React, { useState } from "react";
import "./navbar.css";
import { Link } from "@mui/material";
const Navbar = () => {
  const [isUser, setIsUser] = useState(true);
  return (
    <header>

      <Link href="/">
      <h1>logo</h1>
      </Link>

      <div className="header_links">
        <Link href="/about">about</Link>
        <Link href="/blog">blog</Link>
        <Link href="/service">service</Link>
       
      </div>

      {!isUser ? <Link href="/login">login</Link> : <Link href="/dashboard">profil</Link>}
    </header>
  );
};

export default Navbar;
