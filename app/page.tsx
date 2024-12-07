import { Button } from "@/components/ui/button";

export default function Home() {
  return (
   <div className="relative bg-background">
    <Button variant="default" size="sm">Default and size sm</Button> 
    <Button variant="outline" size="sm">outline and size sm</Button> 
    <Button variant="disabled" size="sm">disabled and size sm</Button> 
   </div>
  );
}
