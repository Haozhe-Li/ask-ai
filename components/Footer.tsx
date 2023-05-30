import type { NextPage } from "next";
import Link from "next/link";
import React from 'react';
import { useRef, useState } from "react";
import Image from 'next/image';


export default function Footer() {
  return (
    <footer className="text-center h-8 sm:h-10 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3">
      <div className="w-full">
          <p>powered by liliang</p>
      </div>
    </footer>
  );
}
