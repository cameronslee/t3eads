import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useState } from "react";
import { useRouter } from 'next/navigation'

const CreatePostWizard = () => {
    const { data: session, status } = useSession();
    const [input, setInput] = useState("");
    const ctx = api.useContext();
    const router = useRouter();
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
          <img src={session.user.image!} alt='Profile Image' className="rounded-full w-8 h-8"/>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={100}
            placeholder="Write something!" 
            className="grow bg-threads-bg-dark text-threads-text-light border border-slate-100 p-2 h-56" 
          />
          <button 
            onClick={() => {
              mutate({content: input}); 
              router.push('/'); 
            }} 
            className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white">
            Post
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300
            group-hover:scale-100 group-hover:bg-threads-secondary-default/30">
            </div>
          </button>
        </div>
      );
    }
    return null;
  };

export default CreatePostWizard;
