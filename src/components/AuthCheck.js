import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "~/lib/context";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);
  // console.log("auth check trigger");
  return username
    ? props.children
    : props.fallback || (
        <button>
          <Link href="/enter">You must be signed in</Link>
        </button>
      );
}
