import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api } from "~/utils/api";
import { useState } from "react";
import { PageLayout } from "~/components/layout";
import { FaHome, FaSistrix, FaRegHeart, FaRegUser} from 'react-icons/fa';
import { HiPencilAlt } from "react-icons/hi";
import { TbNeedleThread } from "react-icons/tb";
import { GiSewingString } from "react-icons/gi";
import { PostView } from "~/components/postview";

const CreatePostWizard = () => {
  const { data: session, status } = useSession();
  const [input, setInput] = useState("");
  const ctx = api.useContext();

  const { mutate } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (err) => {
      console.error(err);
    }
  });

  if (status === "authenticated") {
    return (
      <div className="p-8 flex gap-3 justify-center">
        <img src={session.user.image!} alt='Profile Image' className="rounded-full w-8 h-8" />
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text" 
          maxLength={100}
          placeholder="Enter a task!" 
          className="grow bg-transparent text-threads-bg-dark border rounded-full border-slate-100 p-2" 
        />
        <button onClick={() => mutate({content: input}) } className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white">
          Enter
          <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
        </button>
      </div>
    );
  }
  return null;
};

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
        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-threads-secondary-default/30"></div>
      </button>
    </div>
  );
}

const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div> ...Loading </div>

  if(!data) return <div>fook something went wrong</div>

  return (
    <div className="flex grow flex-col overflow-y-scroll">
      {[...data].map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}    </div>
  )
}


const LoginView = () => {
  return (
    <div className="flex justify-center h-screen w-screen items-center">
      <div className="w-full md:w-1/2 flex flex-col items-center " >
        <h1 className="text-center text-5xl font-bold text-gray-600 mb-6">T3eads</h1>
        <h2 className="text-center text-xl font-bold text-gray-600 mb-6">"LOGIN WALL"</h2>
        <AuthWizard />
      </div>
    </div>
  )
}

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-4 text-4xl">
      <div>
        <FaHome />
      </div>
      <div>
        <FaSistrix />
      </div>
      <div>
        <HiPencilAlt />
      </div>
      <div>
        <FaRegHeart />
      </div>
      <div>
        <FaRegUser />
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
      <CreatePostWizard />
      <Feed />
      <AuthWizard />
      <NavBar />
    </PageLayout>
  );
}

export default function Main() { 
  const { data: session, status } = useSession();
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


