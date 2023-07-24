import { useSession } from 'next-auth/react';
import { FaHome, FaSistrix, FaRegHeart, FaRegUser} from 'react-icons/fa';
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

export const NavBar = () => {
    const { data: sessionData } = useSession();
    const authorName = sessionData?.user.name;
    return (
      <div className="flex items-center justify-between p-4 text-4xl">
          <Link href="/">
            <FaHome />
          </Link>
  
        <Link href="/search">
          <FaSistrix />
        </Link>
        <Link href="/createThread">
          <HiPencilAlt />
        </Link>
        <Link href="/liked">
          <FaRegHeart />
        </Link>
        <Link href={`/@${authorName!}`}>
          <FaRegUser />
        </Link>
      </div>
    )
  }

