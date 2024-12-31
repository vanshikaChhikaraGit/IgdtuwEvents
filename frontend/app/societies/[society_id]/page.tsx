"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { LuCalendarClock } from "react-icons/lu";
import { FaSearchLocation } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton"
import { ImLink } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { MdOutlineKeyboardCommandKey } from "react-icons/md";
import ParticularShimmerUI from "@/components/shared/particularShimmer";
import Footer from "@/components/shared/footer";
import axios from "axios";
interface Society{
  society_name: string;
  society_description: string;
  society_type: string;
  created_on: string;
  registration_link: string;
 
}
export default function EventById(){
  const params = useParams<{ society_id: string }>()
  console.log(params)
  const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL
  const [societyById, setSocietyById ] = useState<Society | undefined>()
  useEffect(()=>{
    const fetchSocietyByID= async()=>{
      try {
        const response = await axios.get<{society:Society}>(`${backendurl}/society/getsociety/${params.society_id}`)
        setSocietyById(response.data.society)
        console.log(JSON.stringify(response.data))
      } catch (error) {
        console.log("error fetching society:",error)
      }
    }
   fetchSocietyByID()

  },[])
  const extractDate = (datetime: string | undefined)=>{
   if(datetime!=undefined){
    const date = datetime.split(" ") 
    const [year, month, day] = date[0].split('-');
    return `${day}-${month}-${year}`;
   }
   }
  if(!societyById){
    return <ParticularShimmerUI></ParticularShimmerUI>
  }
    return (
      <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-200"></div>
      <div className="relative z-10 p-4">
      <div className="h-64 w-full bg-contain bg-center rounded-3xl" style={{ backgroundImage: "url('/assets/images/events.jpg')" }}></div>
      <div className="p-4">
        <h1 className="md:text-7xl m-2 text-4xl font-bold text-gray-900">{societyById?.society_name}</h1>
        <h2 className="text-md m-2">{societyById?.society_description}</h2>
       
         <div className="flex flex-col m-2 text-center space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex flex-col items-center">
            <Badge variant={"outline"} className="w-full sm:w-40 m-1 sm:mb-0 border-sky-400 border-2 p-2"><LuCalendarClock className="inline-block mr-2"></LuCalendarClock>Society Created On</Badge>
          <p>{extractDate(societyById?.created_on)}</p>
          </div>
          <div className="flex flex-col items-center">
          <Badge variant={"outline"} className="w-full sm:w-40 m-1 p-2 sm:mb-0 border-sky-400 border-2"><MdOutlineKeyboardCommandKey className="inline-block mr-2"></MdOutlineKeyboardCommandKey>Society Type</Badge>
          <p>{societyById?.society_type}</p>
          </div>
         </div>
          </div>
         <div className="flex flex-col sm:flex-row m-2 justify-center items-center">
          <div>
          <Badge variant={"outline"} className="m-1 p-2 sm:mb-0 border-red-400 border-2"><ImLink className="inline-block mr-2"></ImLink></Badge>
          <Button variant={"destructive"} className="bg-red-600 rounded-full"onClick={()=>{ window.location.href = societyById?.registration_link || " "}}>Register</Button>
          </div>
        
         </div>
        
      </div>
      </div>
      <Footer></Footer>
    </div>
      )
}