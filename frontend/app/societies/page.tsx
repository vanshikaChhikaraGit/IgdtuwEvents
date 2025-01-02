'use client'
import ShimmerUI from "@/components/shared/shimmer";
import { Button } from "@/components/ui/button";
import { useSocietyTypeIcon } from "@/hooks/use-societytypeicon";
import Link from "next/link";
import { useEffect, useState } from "react"
import axios from "axios";
interface Society {
    society_id: number,
    society_name: string,
    society_description: string,
    society_type: string,
    registration_link: string,
    society_createdon: string,
}

export default function Home(){
    const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL

    const [allSocieties, setAllSocieties] = useState<Society[]>([])
    
    useEffect(()=>{
      const fetchSocieties = async ()=>{
        try{
          const response = await axios.get<{societies:Society[]}>(`${backendurl}/society/getallsocieties`);
          setAllSocieties(response.data.societies)
        }catch(err){
          console.log("error fetching societies:",err)
        }
          
      }
      fetchSocieties()
      },[]
    )
    if (!allSocieties || allSocieties.length === 0) {
        return <ShimmerUI />;
      }
    return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-4xl font-bold ml-4 text-sky-900">Explore</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
          {allSocieties.map((res)=>{
            
            
            return (<Link href={`/societies/${res.society_id}`}>
            <div key={res.society_id} className="w-full hover:cursor-pointer max-w-screen-xl border border-slate-200 bg-white rounded-xl p-4">
              <h2 className="text-center font-semibold text-xl text-gray-800">{res.society_name}</h2>
              
                
                <div className="flex flex-row items-center justify-center">
                    
                    {useSocietyTypeIcon(res.society_type)}
                  <p className="ml-1 text-sm text-gray-700">{res.society_type}</p>
                </div>
                <div className="flex justify-between m-4">
              <Link href={res.registration_link}>
               <Button className="rounded-full mt-2 bg-red-500 hover:bg-transparent hover:border-2 hover:border-sky-500"> Register</Button>
              </Link>
              <Link href={`/societies/${res.society_id}`}>
              <Button className="rounded-full mt-2 bg-gray-800 text-white hover:bg-transparent hover:border-2 hover:border-sky-500 hover:text-black"> Details</Button>
              </Link>
              </div>
              </div>
              </Link>
            )
})}


        </div>

      </div>
      </div>

)}
