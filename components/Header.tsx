import Image from "next/image";
import Link from "next/link";
import React from "react";
import {useRouter} from 'next/router';

export default function Header() {
    const router = useRouter()
    const isIndex = router.pathname == '/'
  return (
    <header className="flex justify-between items-center w-full mt-3 border-b-2 pb-4 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/why.png"
          className="sm:w-12 sm:h-12 w-8 h-8"
          width={32}
          height={32}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          问AI
        </h1>
      </Link>
        {
            isIndex && (
                <div className="flex space-x-3 pb-1 sm:pb-0 mr-2">
                    <Link href="/about" className="font-bold underline hover:underline transition underline-offset-2">
                        关于我
                    </Link>
                </div>
            )
        }
        {
            !isIndex && (
                <div className="flex space-x-3 pb-1 sm:pb-0 mr-2">
                    <Link href="/" className="font-bold underline hover:underline transition underline-offset-2">
                        首页
                    </Link>
                </div>
            )
        }
    </header>
  );
}
