"use client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaLocationDot } from "react-icons/fa6";2
import { FaLink } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import { useState } from 'react'
import axios from "axios"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
const formatDate = (date:Date)=>{
  const year = date.getFullYear()
  const month = String(date.getMonth()+1).padStart(2,'0')
  const day = String(date.getDate()).padStart(2,'0')
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
const formSchema = z.object({
  eventname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(75,{
    message:"event name cannot exceed 75 characters"
  }),
  eventdescription:z.string().max(300,{
    message:"event description cannot exceed 300 words."
  }).optional(),
  organizedby:z.string().max(75,{
    message:"organizer name cannot exceed 75 characters"
  }),
  eventstartdate:z.string(),
  eventenddate:z.string(),
  registrationlink:z.string().url(),
  location:z.string().max(75,{
    message:"location name cannot exceed 75 characters"
  }),
})

export default function ProfileForm() {
  const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        eventname: "",
        eventdescription:"",
        eventstartdate:"",
        eventenddate:"",
        registrationlink:"",
        location:""
       },
      
    })
    
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log("on submit fn")
      try {
        if (!startDate || !(startDate instanceof Date)) {
          throw new Error("Start date is invalid.");
        }
        if (!endDate || !(endDate instanceof Date)) {
          throw new Error("End date is invalid.");
        }
        const formattedStartDate = formatDate(startDate)
        const formattedEndDate = formatDate(endDate)
        const jsonSchema = {
          event_name: values.eventname,
          event_description: values.eventdescription,
          organized_by: values.organizedby,
          event_start_date: formattedStartDate,
          event_end_date: formattedEndDate,
          registration_link:values.registrationlink,
          location:values.location
        }
         console.log(jsonSchema)
         const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL
        const response= await axios.post(`${backendurl}/events/createevent`,jsonSchema,{
         headers:{
          'content-type':'application/json'
         },
        })

        console.log('event submitted successfully',response)
        
          toast({
            variant: "default",
            title: "Event Created Successfully!",
            // description: "There was a problem with your request.",
            // action: <ToastAction altText="Try again">Event Created Successfully!</ToastAction>,
          })

        router.push('/events')
      } catch (error) {
           toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                // action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
            
      }

    }
    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate,setEndDate] = useState<Date | null>()

  const handleStartDateChange = (selectedDate: Date | null) => {
    setStartDate(selectedDate);
  };
  const handleEndDateChange = (selectedDate: Date | null) => {
    setEndDate(selectedDate);
  };


    return(
        <div className="relative isolate px-6 pt-8 lg:px-8">
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
        <h1 className="text-center font-semibold text-5xl sm:text-3xl mb-2">Create Event</h1>
      
        {/* Single Form Element */}
        <Form {...form}>
          {/* Main Form Tag */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm mx-auto shadow-md bg-pink-50 rounded-xl p-4 text-xl">
            
            {/* Event Name Field */}
            <FormField
              control={form.control}
              name="eventname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block m-1 font-semibold text-xl">Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="event name" className="bg-gray-50 shadow-md border-gray-300 rounded-xl border-2 text-sm font-extralight text-gray-600 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "{...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Event Description Field */}
            <FormField
              control={form.control}
              name="eventdescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block m-2 text-xl font-medium">Event Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about your event"
                      className="bg-gray-50 shadow-md border-gray-300 block border-2 p-2.5 focus:ring-blue-500 focus:border-blue-500 rounded-xl text-sm text-gray-600 w-full resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organizedby"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block m-2 text-xl font-medium">Organiser</FormLabel>
                  <FormControl>
                    <div className="flex shadow-md items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 resize-none">
                        <IoPerson></IoPerson>
                    <Input className="border-none resize-none"
                      {...field}
                    />
                    </div>
                    
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Event Start Date Field */}
            <FormField
              control={form.control}
              name="eventstartdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block m-2 text-xl font-medium">Event Start Date</FormLabel>
                  <FormControl>
                    <div className="flex shadow-md text-sm items-center w-full border border-gray-300 overflow-hidden rounded-xl bg-gray-50 px-4 py-2">
                    <LuCalendarDays></LuCalendarDays>
                  <div className="">
                    <DatePicker
                      selected={startDate} // Ensure field.value is a valid Date
                      onChange={handleStartDateChange}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="yyyy/MM/dd hh:mm aa"
                       wrapperClassName="datePicker"
                    />
                    </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventenddate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block m-2 text-xl font-medium">Event End Date</FormLabel>
                  <FormControl>
                    <div className="flex shadow-md text-sm items-center w-full border border-gray-300 overflow-hidden rounded-xl bg-gray-50 px-4 py-2">
                    <LuCalendarDays></LuCalendarDays>
                  <div className="">
                    <DatePicker
                      selected={endDate} // Ensure field.value is a valid Date
                      onChange={handleEndDateChange}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="yyyy/MM/dd hh:mm aa"
                      wrapperClassName="datePicker"
                    />
                    </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block m-2 text-xl font-medium">Location</FormLabel>
                  <FormControl>
                    <div className="flex shadow-md items-center w-full border border-gray-300 overflow-hidden rounded-xl bg-gray-50 px-4 py-2">
                   <FaLocationDot></FaLocationDot>
                   <Input className="border-none resize-none"
                      {...field}
                    />
                    </div>
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registrationlink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block m-2 text-xl font-medium">Registration Link</FormLabel>
                  <FormControl>
                    <div className="flex shadow-md items-center w-full border border-gray-300 overflow-hidden rounded-xl bg-gray-50 px-4 py-2">
                   <FaLink></FaLink>
                   <Input className="border-none resize-none"
                      {...field}
                    />
                    </div>
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
      
            <Button type="submit" className="rounded-full flex mx-auto mt-3 bg-red-500 hover:bg-sky-600">Submit</Button>
          </form>
        </Form>
      </div>
    )
}