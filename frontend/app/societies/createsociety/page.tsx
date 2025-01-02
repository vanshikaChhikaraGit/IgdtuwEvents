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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  societyname: z.string().min(2, {
    message: "society name must be at least 2 characters.",
  }).max(75,{
    message:"society name cannot exceed 75 characters"
  }),
  societydescription:z.string().max(300,{
    message:"event description cannot exceed 300 words."
  }).optional(),
  societytype:z.string({message:"society type cannot be empty"}),
  societycreatedon:z.string(),
  registrationlink:z.string().url()
})

export default function ProfileForm() {
  const [position, setPosition] = useState("bottom")
  const { toast } = useToast()
    const router = useRouter()
    const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        societyname: "",
        societydescription:"",
        societycreatedon:"",
        registrationlink:"",
        societytype:"",
      
      },
      
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log("on submit fn")
      try {
        if (!createdOnDate || !(createdOnDate instanceof Date)) {
          throw new Error("Created On date is invalid.");
        }
        const formattedCreatedOnDate = formatDate(createdOnDate)
        const jsonSchema = {
         society_name: values.societyname,
         society_description:values.societydescription,
         society_type:values.societytype,
         registration_link:values.registrationlink,
         created_on: formattedCreatedOnDate
        }
         console.log(jsonSchema)
        const response= await axios.post(`${backendurl}/society/createsociety`,jsonSchema,{
         headers:{
          'content-type':'application/json'
         },
        })

        console.log('event submitted successfully',response)
        
          toast({
            variant: "default",
            title: "Society Created Successfully!",
           
          })

        router.push('/societies')
      } catch (error) {
           toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              })
            
      }

    }
    const [createdOnDate, setCreatedOnDate] = useState<Date | null>();

  const handleStartDateChange = (selectedDate: Date | null) => {
    setCreatedOnDate(selectedDate);
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
        <h1 className="text-center font-semibold text-5xl sm:text-3xl mb-2">Create Society</h1>
      
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm mx-auto shadow-md bg-pink-50 rounded-xl p-4 text-xl">
            
            <FormField
              control={form.control}
              name="societyname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block m-1 font-semibold text-xl">Society Name</FormLabel>
                  <FormControl>
                    <Input placeholder="society name" className="bg-gray-50 shadow-md border-gray-300 rounded-xl border-2 text-sm font-extralight text-gray-600 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "{...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="societydescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block m-2 text-xl font-medium">SocietyDescription</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about your society"
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
              name="societytype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block m-2 text-xl font-medium">Society Type</FormLabel>
                  <FormControl>
                  <Popover>
          <PopoverTrigger asChild>
            <div
              className="flex shadow-md items-center bg-white border border-gray-300 text-black text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 resize-none cursor-pointer"
            >
              <IoPerson />
              <span className="ml-2">{field.value || "Select Society Type"}</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-sm bg-white border-0 rounded-3xl text-black">
            <RadioGroup
              className="space-y-2"
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="technical" id="technical" />
                <label htmlFor="technical" className="text-sm text-gray-700">
                  Technical
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dance" id="dance" />
                <label htmlFor="dance" className="text-sm text-gray-700">
                  Dance
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="music" id="music" />
                <label htmlFor="music" className="text-sm text-gray-700">
                  Music
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="art" id="art" />
                <label htmlFor="art" className="text-sm text-gray-700">
                  Art
                </label>
                </div>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="drama" id="drama" />
                <label htmlFor="drama" className="text-sm text-gray-700">
                 Drama
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="literary" id="literary" />
                <label htmlFor="literary" className="text-sm text-gray-700">
                Literary
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sports" id="sports" />
                <label htmlFor="sports" className="text-sm text-gray-700">
                Sports
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <label htmlFor="other" className="text-sm text-gray-700">
                Other
                </label>
              </div>
            
            </RadioGroup>
          </PopoverContent>
        </Popover>
                    
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
              name="societycreatedon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block m-2 text-xl font-medium">Society Created On</FormLabel>
                  <FormControl>
                    <div className="flex shadow-md text-sm items-center w-full border border-gray-300 overflow-hidden rounded-xl bg-gray-50 px-4 py-2">
                    <LuCalendarDays></LuCalendarDays>
                  <div className="">
                    <DatePicker
                      selected={createdOnDate} // Ensure field.value is a valid Date
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