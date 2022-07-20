import {
  firestore,
  getUserWithUsername,
  postToJSON,
  auth,
} from "~/lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PostContent from "~/components/PostContent";
import styles from "~/components/styles/Post.module.css";
import MetaTags from "~/components/MetaTags";
import AuthCheck from "~/components/AuthCheck";
import HeartButton from "~/components/HeartButton";
import Link from "next/link";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}

// If a page has Dynamic Routes and uses getStaticProps,
// it needs to define a list of paths to be statically generated.
export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc) => {
    const { username, slug } = doc.data();
    return {
      params: { username, slug },
    };
  });
  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    // fallback to server-side-rendering if a page not rendered yet
    paths,
    fallback: "blocking",
  };
}

function PostPage(props) {
  // Realtime Post: when content || heart changed it will reflected in the ui
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      <MetaTags title={post.title} />
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>

        {auth.currentUser?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`}>
            <button className="btn-blue">Edit Post</button>
          </Link>
        )}
      </aside>
    </main>
  );
}

export default PostPage;
