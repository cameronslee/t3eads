import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import Link from "next/link";

import { BiDotsHorizontal } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { PiChatCircleLight, PiArrowsClockwiseFill} from "react-icons/pi";

import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
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

const ActionBar = () => {
    return (
        <div className="flex space-x-4 items-center w-48 pt-4">
            <FaRegHeart className="text-2xl" />
            <PiChatCircleLight className="text-2xl -scale-y-100 -rotate-180" />
            <PiArrowsClockwiseFill className="text-2xl" />
            <LuSend className="text-2xl" /> 
        </div>
    );
    }

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
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
            <ActionBar />
          </div>
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