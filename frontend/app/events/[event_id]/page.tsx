"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { LuCalendarClock } from "react-icons/lu";
import { FaSearchLocation } from "react-icons/fa";
import { ImLink } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import ParticularShimmerUI from "@/components/shared/particularShimmer";
import Footer from "@/components/shared/footer";
import axios from "axios";
interface Event{
  event_name: string;
  event_description: string;
  organized_by: string;
  event_start_date: string;
  event_end_date: string;
  registration_link: string;
  location: string;
}
export default function EventById(){
  const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL
  const params = useParams<{ event_id: string }>()
  console.log(params)
  
  const [eventById, setEventById ] = useState<Event | undefined>()
  useEffect(()=>{
    const fetchEventByID= async()=>{
      try {
        const response = await axios.get<{event:Event}>(`${backendurl}/events/getevent/${params.event_id}`)
        setEventById(response.data.event)
        console.log(JSON.stringify(response.data))
      } catch (error) {
        console.log("error fetching events:",error)
      }
    }
   fetchEventByID()

  },[])
  const extractDate = (datetime: string | undefined)=>{
   if(datetime!=undefined){
    const date = datetime.split(" ") 
    const [year, month, day] = date[0].split('-');
    return `${day}-${month}-${year}`;
   }
   }
   const extractTime = (datetime: string | undefined) =>{
    if(datetime!=undefined){
      const date = datetime.split(" ") 
      return date[1];
     }
   }
   if(!eventById){
    return <ParticularShimmerUI></ParticularShimmerUI>
   }
    return (
      <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-200"></div>
      <div className="relative z-10 p-4">
      <div className="h-64 w-full bg-contain bg-center rounded-3xl" style={{ backgroundImage: "url('/assets/images/events.jpg')" }}></div>
      <div className="p-4">
        <h1 className="md:text-7xl m-2 text-4xl font-bold text-gray-900">{eventById?.event_name}</h1>
        <h2 className="text-md m-2">{eventById?.event_description}</h2>
       
         <div className="flex flex-col m-2 text-center space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex flex-col items-center">
            <Badge variant={"outline"} className="w-full sm:w-40 m-1 sm:mb-0 border-sky-400 border-2 p-2"><LuCalendarClock className="inline-block mr-2"></LuCalendarClock>Event Start Date</Badge>
          <p>{extractDate(eventById?.event_start_date)}</p>
          </div>
          <div className="flex flex-col items-center">
          <Badge variant={"outline"} className="w-full sm:w-40 m-1 p-2 sm:mb-0 border-sky-400 border-2"><LuCalendarClock className="inline-block mr-2"></LuCalendarClock>Event Start Time</Badge>
          <p>{extractTime(eventById?.event_start_date)}</p>
          </div>
         </div>
         <div className="flex sm:flex-row flex-col justify-between items-center sm:space-x-4 sm:space-y-0">
         <div className="flex flex-col items-center">
            <Badge variant={"outline"} className="w-full sm:w-40 m-1 p-2 sm:mb-0 border-sky-400 border-2"><LuCalendarClock className="inline-block mr-2"></LuCalendarClock>Event End Date</Badge>
          {extractDate(eventById?.event_end_date)}
          </div>
          <div>
          <Badge variant={"outline"} className="w-full sm:w-40 m-1 p-2 sm:mb-0 border-sky-400 border-2"><LuCalendarClock className="m-1"></LuCalendarClock>Event End Time</Badge>
         <p>{extractTime(eventById?.event_end_date)}</p> 
          </div>
         </div>
         </div>
         <div className="flex flex-col sm:flex-row justify-between items-center sm:space-x-4 sm:space-y-0 m-2">
          <div className="text-center">
          <Badge variant={"outline"} className="w-full sm:w-40 m-1 p-2 sm:mb-0 border-sky-400 border-2"><FaSearchLocation className="inline-block mr-2"></FaSearchLocation>Location</Badge>
          <p>{eventById?.location}</p>
          </div>
         </div>
         <div className="flex flex-col sm:flex-row m-2 justify-center items-center">
          <div>
          <Badge variant={"outline"} className="m-1 p-2 sm:mb-0 border-red-400 border-2"><ImLink className="m-1"></ImLink></Badge>
          <Button variant={"destructive"} className="bg-red-600 rounded-full"onClick={()=>{ window.location.href = eventById?.registration_link || " "}}>Register</Button>
          </div>
        
         </div>
        
      </div>
      </div>
      <Footer></Footer>
    </div>
   
      )
}