"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="data-[side=right]:w-1/2 px-6 py-3"> 
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Access the main pages of the application.
        </SheetDescription> 
        <Logo />
        <div onClick={() => setOpen(false)}>
          <NavMenu orientation="vertical" className="mt-6 [&>div]:h-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
