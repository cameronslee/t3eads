import type { PropsWithChildren } from "react";
import NavBar from "./navbar";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center">
      <div className="flex h-full w-full flex-col border-slate-400 md:max-w-2xl md:max-h-2xl">
        {props.children}
        <NavBar />
      </div>
    </main>
  );
};