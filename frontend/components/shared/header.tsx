import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Header(){
   
    return <header className="max-w-screen border-b flex">
        <div className="wrapper flex items-center justify-between">
            <Link href={"/"}>
           <span className="font-light text-xl md:text-3xl z-21"> IGDTUW Events </span> 
             </Link>
       
        <div className="flex justify-end items-center gap-2">
            <SignedIn >
                <UserButton afterSignOutUrl="/"></UserButton>
            </SignedIn>
            <SignedOut>
               <div className="bg-gradient-to-r z-20 from-blue-500 to-blue-700 font-medium text-white py-2 px-4 rounded-full shadow-lg ">
                <SignInButton mode="modal" ></SignInButton>
                </div>
             </SignedOut>

        </div>
        </div>
    </header>
}