import React from "react";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav>
      <div>
        <Link href="/">
          <a>Kap's kitchen</a>
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/chefs">
              <a>Chefs</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
