import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import Link from "next/link";

import { BiDotsHorizontal } from "react-icons/bi";

import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: 'a few seconds',
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%dh",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
})
type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex gap-3 border-b border-threads-bg-light border-opacity-10 p-4">
      <img
        src={author!.image!}
        className="h-14 w-14 rounded-full"
        alt={`@${author!.name!}'s profile picture`}
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <div className="flex gap-96 text-slate-300">
          <Link href={`/@${author!.name!}`}>
            <span>{`@${author!.name!} `}</span>
          </Link>
          <div className="flex gap-3">
            <Link href={`/post/${post.id}`}>
            <span className="font-thin">{`${dayjs(
              post.createdAt
            ).fromNow()}`}</span>
            </Link>
            <BiDotsHorizontal className="invert-0 text-xl"/>
          </div>

        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  );
};