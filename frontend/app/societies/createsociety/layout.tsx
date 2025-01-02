import React from "react";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default function RootLayout({children}:{children:React.ReactNode}){
    return(
        <div >
        <Header></Header>
        <main>{children}</main>
        </div>
        
    )
   
}