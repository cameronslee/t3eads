import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api } from "~/utils/api";
import { useState } from "react";
import { PageLayout } from "~/components/layout";
import { FaHome, FaSistrix, FaRegHeart, FaRegUser} from 'react-icons/fa';
import { HiPencilAlt } from "react-icons/hi";
import { TbNeedleThread } from "react-icons/tb";
import { BiDotsHorizontal } from "react-icons/bi";
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
        <button onClick={() => mutate({content: input}) }className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Enter
        </button>
      </div>
    );
  }
  return null;
  
};

function AuthWizard() {
  const { data: sessionData } = useSession();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div> ...Loading </div>

  if(!data) return <div>fook</div>

  return (
    <div className="flex grow flex-col overflow-y-scroll">
      {[...data, ...data, ...data, ...data].map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}    </div>
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

export default function Home() {
  const { data: session } = useSession();
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div> ...Loading </div>

  if(!data) return <div>fook</div>

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center p-4 text-6xl">
        <TbNeedleThread />
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


