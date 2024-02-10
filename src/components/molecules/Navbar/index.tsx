import React from "react";
import Link from "next/link";
import { Login, Logout, Person } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { authSelector, authReset, logout } from "@/store/auth/authSlice";

function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);

  const onLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    router.push("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">ExpenseTracker</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <Logout /> Logout
            </button>
          </li>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </header>
  );
}

export default Navbar;
