import React from "react";
import Link from "next/link";
import { Login, Logout, Person } from "@mui/icons-material";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">GoalSetter</Link>
      </div>
      <ul>
        <li>
          <button className="btn">
            <Logout /> Logout
          </button>
        </li>
        <li>
          <Link href="/login">
            <Login /> Login
          </Link>
        </li>
        <li>
          <Link href="/register">
            <Person /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
