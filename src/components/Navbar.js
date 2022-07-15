import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "~/lib/context";

function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button>FEED</button>
          </Link>
        </li>

        {/* User is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-blue">Write Post</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} alt={username} />
              </Link>
            </li>
          </>
        )}

        {/* User is not signed-in and not has username */}
        {!username && (
          <li className="push-left">
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
