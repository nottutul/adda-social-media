import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { Loader, Search } from "lucide-react";
import { ClerkLoading, ClerkLoaded, UserButton, Show } from "@clerk/nextjs";
import Link from "next/link";
import { Input } from "../ui/input";

const Navbar02Page = () => {
  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-3">
        <div className="flex items-center gap-8"> 
            <Link href="/"><Logo /></Link>       
      
          {/* Desktop Menu */}
          <NavMenu className="hidden sm:block" />
          <div className="hidden md:flex md:gap-1">   
            <Input type="search" placeholder="Search..." />
            <Button><Search /></Button>  
          </div>
        </div> 

        <div className="flex items-center gap-3">
          <ClerkLoading>
            <Loader className="animate-spin" />
          </ClerkLoading>

          <ClerkLoaded>
            <Show when="signed-in">
              <UserButton />
            </Show>
          <Show when="signed-out">
            <Button variant="outline" className="hidden sm:inline-flex">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button>
              <Link href="/sign-up">Sign Up</Link>
              </Button>
          </Show>
          </ClerkLoaded>
          
 
          <ModeToggle />

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar02Page;


