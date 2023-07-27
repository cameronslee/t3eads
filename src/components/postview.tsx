import type { RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import Link from "next/link";

import { api } from "~/utils/api";
import { BiDotsHorizontal } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { PiChatCircleLight, PiArrowsClockwiseFill} from "react-icons/pi";

import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

import { useState } from "react";

import { Post } from "@prisma/client";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1s',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy'
  }
})

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

interface ActionBarProps {
  postId: Post["id"];
  isLiked: boolean;
}

const ActionBar = (postProps: ActionBarProps) => {
  const ctx = api.useContext();

  const [liked, setLiked] = useState(postProps.isLiked);

  const { mutate: like } = api.posts.like.useMutation({
  onSuccess: () => {
    void ctx.posts.getAll.invalidate();
  },
  onError: (err) => {
  console.error(err);
  }
  });

  const { mutate: unLike } = api.posts.unlike.useMutation({
  onSuccess: () => {
    void ctx.posts.getAll.invalidate();
  },
  onError: (err) => {
  console.error(err);
  }
  });


  return (
      <div className="flex space-x-4 items-center w-48 pt-4">
      <button 
      onClick={() => { 
        liked ? unLike({postId: postProps.postId}) : like({postId: postProps.postId}); 
        liked ? setLiked(false) : setLiked(true);
      }} 
      >
      {liked ? <FaRegHeart className="text-2xl text-threads-secondary-default" /> : <FaRegHeart className="text-2xl" />}
      </button>
      <PiChatCircleLight className="text-2xl -scale-y-100 -rotate-180" />
      <PiArrowsClockwiseFill className="text-2xl" />
      <LuSend className="text-2xl" /> 
      </div>
  );
}


export const PostView = (postProps: PostWithUser) => {
  const { post, author, likes} = postProps;
  const likeData = api.posts.hasLiked.useQuery({postId: post.id}).data ? true : false;

  return (
    <div key={post.id} className="flex justify-between border-b border-threads-bg-light border-opacity-10 p-4">
        <div className="flex gap-4">
          <img
            src={author!.image!}
            className="h-14 w-14 rounded-full"
            alt={`@${author!.name!}'s profile picture`}
            width={56}
            height={56}
          />
          <div className="flex flex-col justify-between pb-4">
          <Link className="justify-self-start" href={`/@${author!.name!}`}>
            <span>{`@${author!.name!} `}</span>
          </Link>
          <p className="text-xl break-all">{post.content}</p> 
          <div>
            <ActionBar postId={post.id} isLiked={likeData}/>
          </div>
            {likes.length} {likes.length === 1 ? "like" : "likes"}
        </div>

        </div>

        <div className="flex justify-end w-3/12 space-x-0.5">
          <Link className="" href={`/post/${post.id}`}>
            <span className="font-thin">{`${dayjs(
              post.createdAt
            ).fromNow()}`}</span>
          </Link>
          <BiDotsHorizontal className="invert-0 h-6 w-10" />
        </div>

    </div>
  );
};
