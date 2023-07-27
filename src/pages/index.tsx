import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { GiSewingString } from "react-icons/gi";
import { PostView } from "~/components/postview";

const AuthWizard = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-threads-bg-dark text-lg font-bold text-white"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
        <div 
          className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300
          group-hover:scale-100 group-hover:bg-threads-secondary-default/30">
          </div>
      </button>
    </div>
  );
}

const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div> ...Loading </div>

  if(!data) return <div>fook something went wrong</div>

  return (
    <div className="flex grow flex-col overflow-y-scroll no-scrollbar">
      {[...data].map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}    </div>
  )
}

const LoginView = () => {
  return (
    <div className="flex justify-center h-screen w-screen items-center">
      <div className="w-full md:w-1/2 flex flex-col items-center" >
        <h1 className="text-center text-5xl font-bold text-gray-600 mb-6">T3eads</h1>
        <h2 className="text-center text-xl font-bold text-gray-600 mb-6">LOGIN WALL</h2>
        <AuthWizard />
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center p-4 text-6xl">
        <GiSewingString />
      </div>
      <Head>
        <title>T3eads</title>
      </Head>
      <Feed />
      <AuthWizard />
    </PageLayout>
  );
}

export default function Main() { 
  const { status } = useSession();
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div> ...Loading </div>

  if(!data) return <div>fook</div>

  if (status === "authenticated") {
    return (
      <Home />
    );
  }
  return (
    <LoginView />
  );
}


