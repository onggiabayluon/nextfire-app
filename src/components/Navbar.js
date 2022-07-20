import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "~/lib/context";
import { auth } from "~/lib/firebase";

function Navbar() {
  const { user, username } = useContext(UserContext);

  const logout = (e) => {
    e.preventDefault();
    auth.signOut();
  };

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
                <div>
                  {user?.photoURL ? (
                    <Image
                      src={user?.photoURL}
                      alt={username}
                      width={50}
                      height={50}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </Link>
            </li>
            <li>
              <button style={{ marginLeft: "10px" }} onClick={logout}>
                Sign Out
              </button>
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
