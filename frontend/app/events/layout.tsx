'use client'
import { usePathname } from 'next/navigation';
import CreateEventHeader from "@/components/shared/create-event-header"
import Footer from "@/components/shared/footer"
import React from "react"

export default function RootLayout({children}:{children:React.ReactNode}){
  const pathname = usePathname();

  // Check if the current route is `/events/createevent`
  const showHeader = pathname === '/events';
return (

 
    
    <div className="flex h-screen flex-col">
    {showHeader&&<CreateEventHeader></CreateEventHeader>}
    
    <main className="flex-1">{children}</main>
    <Footer></Footer>
 
    </div>
  )
}