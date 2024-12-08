'use client'

import * as React from "react";
import { Button } from "@/components/ui/button";
import QuestionList from "@/components/QuestionList";

export default function Home() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-screen min-h-screen relative bg-background flex flex-col justify-start px-2 mx-auto md:max-w-xl">
      <div className="flex flex-wrap transition-colors ease-out duration-75 items-center justify-center gap-2 my-7 p-4 border rounded-2xl hover:bg-gray-50">
        <Button variant="default" size="sm">Default and size sm</Button>
        <Button variant="outline" size="sm">outline and size sm</Button>
        <Button variant="disabled" size="sm">disabled and size sm</Button>
      </div>
      <QuestionList onQuestionAdd={scrollToBottom} />
    </div>
  );
}