'use client'

import * as React from "react";
import QuestionList from "@/components/QuestionList";
import CreateFormLayout from "@/components/CreateFormLayout";

export default function Home() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <CreateFormLayout>
      <QuestionList onQuestionAdd={scrollToBottom} />
    </CreateFormLayout>
  );
}