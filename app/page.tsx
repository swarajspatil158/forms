import ArrowUpRightIcon from "@/components/Icons/ArrowUpRightIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import ChevDownIcon from "@/components/Icons/ChevDownIcon";
import DraftIcon from "@/components/Icons/DraftIcon";
import DragDropVerticalIcon from "@/components/Icons/DragDropVertical";
import HashtagIcon from "@/components/Icons/HashtagIcon";
import LongAnswerIcon from "@/components/Icons/LongAnswerIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import RadioIcon from "@/components/Icons/RadioIcon";
import ShortAnswerIcon from "@/components/Icons/ShortAnswerIcon";
import UrlIcon from "@/components/Icons/UrlIcon";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
   <div className="relative bg-background">
    <div className="flex flex-wrap transition-colors ease-out duration-75 items-center justify-center max-w-3xl mx-3 md:mx-auto gap-2 my-7 p-4 border rounded-2xl hover:bg-gray-50">
      <Button variant="default" size="sm">Default and size sm</Button> 
      <Button variant="outline" size="sm">outline and size sm</Button> 
      <Button variant="disabled" size="sm">disabled and size sm</Button> 
    </div>
    <div className="flex flex-wrap transition-colors ease-out duration-75 items-center justify-center max-w-3xl mx-3 md:mx-auto gap-2 my-7 p-4 border rounded-2xl hover:bg-gray-50">
      <ArrowUpRightIcon   strokeWidth={2} className="text-primary h-5 w-5" />
      <CalendarIcon   strokeWidth={2} className="text-primary h-5 w-5" />
      <CheckIcon   strokeWidth={2} className="text-primary h-5 w-5" />
      <ChevDownIcon  strokeWidth={2} className="text-primary h-5 w-5" />
      <DraftIcon   strokeWidth={2} className="text-primary h-5 w-5" />
      <DragDropVerticalIcon   strokeWidth={2} className="text-primary h-5 w-5" />
      <HashtagIcon   strokeWidth={2} className="text-primary h-5 w-5" />
      <LongAnswerIcon   strokeWidth={2} className="text-primary h-5 w-5" />
      <PlusIcon   strokeWidth={2} className="text-primary h-5 w-5" />
      <RadioIcon   strokeWidth={2} className="text-primary h-5 w-5" />
      <ShortAnswerIcon   strokeWidth={2} className="text-primary h-5 w-5" />
      <UrlIcon   strokeWidth={2} className="text-primary h-5 w-5" />
    </div>
   </div>
  );
}
