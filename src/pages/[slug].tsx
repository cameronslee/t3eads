import Head from "next/head";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import type { GetStaticProps, NextPage } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { ProfilePostView } from "~/components/profilepostview";


const ProfileFeed = (props: {userId: string}) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({userId: props.userId});
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>User does not have any posts</div>;
  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <ProfilePostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const ProfilePage: NextPage<{username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({username});
  if (!data) return <div>foooooooook</div>
   return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>
      <PageLayout>
        <div className="flex relative h-36 bg-slate-600">
          <img
            src={data.image!}
            alt={`${
              data.name ?? "unknown"
            }'s profile pic`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">{`@${
          data.name ?? "unknown"
        }`}</div>
        <div className="w-full border-b border-slate-400" />
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
   )
};
export const getStaticProps: GetStaticProps = (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  return {
    props: {
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
