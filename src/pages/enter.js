import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "~/lib/context";
import { auth, googleAuthProvider } from "~/lib/firebase";

function EnterPage() {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

// Sign in with Google Button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <Image
        src={"/google.png"}
        alt="sign in with google"
        width="30px"
        height="30px"
      />
      Sign in with Google
    </button>
  );
}

// Sign out Button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

// form
function UsernameForm() {}

export default EnterPage;
