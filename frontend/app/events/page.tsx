'use client'
import ShimmerUI from "@/components/shared/shimmer";
import { Button } from "@/components/ui/button";
import { error } from "console"
import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
interface Event {
  event_id: number;
  event_name: string;
  event_description: string;
  organized_by: string;
  event_start_date: string;
  event_end_date: string;
  registration_link: string;
  location: string;
}

export default function Home(){
    const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL
    const [allEvents, setAllEvents] = useState<Event[]>([])
    
    useEffect(()=>{
      const fetchEvents = async ()=>{
        try{
          const response = await axios.get<{ events:Event[] }>(`${backendurl}/events/getallevents`);
          setAllEvents(response.data.events)
         
         }catch(err){
          console.log("error fetching events:",err)
        }
          
      }
      fetchEvents()
      },[]
    )
    if(!allEvents || allEvents.length===0){
      return <ShimmerUI></ShimmerUI>
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
        <h1 className="sm:text-4xl text-2xl font-bold ml-4 text-sky-900">Explore</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
          {allEvents.length>0? allEvents.map((res)=>{
            const [eventDate,eventTime] = res.event_start_date.split(' ')
            const date = eventDate.split('-').reverse().join('-')
            const time = `${eventTime.slice(0,2)}:${eventTime.slice(3,5)}`
            return (
           <Link href={`/events/${res.event_id}`}><div key={res.event_id} className="w-full hover:cursor-pointer max-w-screen-xl border border-slate-200 bg-white rounded-xl p-4">
              <h2 className="text-center font-semibold text-xl text-gray-800">{res.event_name}</h2>
              <div >
              <div className="mt-4 flex justify-between items-center">
                <div className="flex flex-col text-left">
                  <span className="text-lg font-medium text-gray-700">
                    {date}
                  </span>
                  <span className="text-sm mt-1 text-gray-500">{time}</span>
                </div>
                
                <div className="flex flex-row items-center">
                  <CiLocationOn className="text-cyan-600 text-xl" />
                  <p className="ml-1 text-sm text-gray-700">{res.location}</p>
                </div>
                </div>
              </div>
              <div className="flex justify-between">
              <Link href={res.registration_link}>
               <Button className="rounded-full mt-2 bg-red-500 hover:bg-transparent hover:border-2 hover:border-sky-500"> Register</Button>
              </Link>
              <Link href={`/events/${res.event_id}`}>
              <Button className="rounded-full mt-2 bg-gray-800 text-white hover:bg-transparent hover:border-2 hover:border-sky-500 hover:text-black"> Details</Button>
              </Link>
              </div>
              </div>
              </Link> 
            )
            }):<ShimmerUI></ShimmerUI>}


        </div>

      </div>
      </div>

)
}