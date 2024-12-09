'use client'

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
 

  return (
    <div className="w-screen min-h-screen relative bg-background flex flex-col justify-start mt-[20vh] px-2 mx-auto md:max-w-xl">
      <div className="flex flex-wrap transition-colors ease-out duration-75 items-center justify-center gap-2 my-7 p-4  rounded-2xl ">
        <Button onClick={()=> router.push('/forms/create')} variant="default" size="sm">Create Form</Button>
        <Button onClick={()=> router.push('/forms')} variant="outline" size="sm">View All Forms</Button>
      </div>
    </div>
  );
}