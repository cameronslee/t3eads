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
//Catch All 

const ProfileFeed = (props: {userId: string}) => {
};

const ProfilePage = () => {
   return (
    <div>
      TODO
    </div>
   )
};
export default ProfilePage;
