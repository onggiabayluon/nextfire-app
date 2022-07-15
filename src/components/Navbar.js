import Image from "next/image";
import Link from "next/link";
function Navbar() {
  const user = null;
  const username = null;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button>FEED</button>
          </Link>

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
                  <Image src={user?.photoURL} alt={username} />
                </Link>
              </li>
            </>
          )}

          {/* User is not signed-in and not has username */}
          {!username && (
            <li>
              <Link href="/enter">
                <button className="btn-blue">Log in</button>
              </Link>
            </li>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
