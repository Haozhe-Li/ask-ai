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
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          AI
        </h1>
      </Link>
        {
            isIndex && (
                <div className="flex space-x-3 pb-1 sm:pb-0 mr-2">
                    <Link href="/about" className="font-bold underline hover:underline transition underline-offset-2">
                        About
                    </Link>
                </div>
            )
        }
        {
            !isIndex && (
                <div className="flex space-x-3 pb-1 sm:pb-0 mr-2">
                    <Link href="/" className="font-bold underline hover:underline transition underline-offset-2">
                        Home
                    </Link>
                </div>
            )
        }
    </header>
  );
}
