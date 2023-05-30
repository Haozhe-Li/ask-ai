import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import { Analytics } from '@vercel/analytics/react';
import Link from "next/link";


const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("为什么鸡蛋会孵出小鸡？");
  const [inputHint, setInputHint] = useState("输入您的问题,如:为什么鸡蛋会孵出小鸡?");
  const [vibe, setVibe] = useState<VibeType>("十万个为什么");
  const [generatedAnswers, setGeneratedAnswers] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToAnswers = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `${bio}`;

  const generateAnswer = async (e: any) => {
    if (prompt == '') {
      toast("请输入问题",{icon:'✘'});
      return;
    }
    e.preventDefault();
    setGeneratedAnswers("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:prompt,
        role:'十万个为什么'
      }),
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      setLoading(false);
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedAnswers((prev) => prev + chunkValue);
    }
    scrollToAnswers();
    setLoading(false);
  };

  return (
    <>
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>问AI</title>
        <link rel="icon" href="/why.png" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-stretch text-center px-4 mt-8 sm:mt-10">
        <h1 className="sm:text-4xl text-4xl max-w-[708px] font-bold text-slate-900">
          无所不知,知无不言
        </h1> 
        <p className="text-slate-500 mt-1">You ask, AI answer</p>
        <div className="max-w-xl w-full sm:mt-4 mt-4">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-3"
            placeholder={inputHint}
          />
          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-1 mt-1 hover:bg-black/80 w-full"
              onClick={(e) => generateAnswer(e)}
            >
              问AI
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-1 mt-1 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}

        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedAnswers && (
            <>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedAnswers
                  .substring(0)
                  .split("___")
                  .map((generatedAnswer) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedAnswer);
                          toast("回答已复制", {
                            icon: "✔",
                          });
                        }}
                        key={generatedAnswer}
                      >
                        <p className="text-left">{generatedAnswer}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
    <Analytics />
    </>
  );
};

export default Home;
