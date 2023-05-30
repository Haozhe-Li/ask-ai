import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Analytics } from '@vercel/analytics/react';
import Header from "../components/Header";


const About: NextPage = () => {

  return (
    <>
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>问AI</title>
        <link rel="icon" href="/why.png" />
      </Head>
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-stretch text-center px-4 mt-4 sm:mt-6">

        <div className="max-w-xl w-full sm:mt-0.5 mt-0.5">
          <p className="w-10/12 text-slate-500 mt-1 text-left">A father who loves his daughter,</p>
          <p className="w-10/12 text-slate-500 mt-1 text-left">a husband who loves his wife,</p>
          <p className="w-10/12 text-slate-500 mt-1 text-left">a son who loves his parents,</p>
          <p className="w-10/12 text-slate-500 mt-1 text-left">a programmer who loves his code.</p>
        </div>

        <div className="max-w-xl w-full mt-4 sm:mt-4">
          <Image
              src="/qrcode.png"
              width="0"
              height="0"
              alt=""
              sizes="100vw"
              className="w-full h-auto"
          />
        </div>
      </main>
    </div>
    <Analytics />
    </>
  );
};

export default About;
