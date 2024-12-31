import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home(){
return(
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
    <div className="flex flex-col justify-center items-center min-h-screen pb-16 sm:pb-20 lg:pb-28">
    <div className="text-center">
        <h1 className="text-balance font-semibold text-5xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight text-gray-900">
        Your Campus, Your Stage 
        </h1>
        <p className="mt-8 text-pretty text-lg font-medium sm:mt-6 sm:text-xl/8 text-gray-600">Your go-to platform for all things events. From academic conferences to cultural festivals, sports tournaments to social gatherings we've got you covered!.</p>
    <Link href={'/events'}>
    <Button className="bg-black mt-10 text-lg py-2 px-4 sm:px-6 lg:px-8 rounded-full text-white hover:bg-transparent hover:text-black hover:border-sky-400 hover:border-2 ">Step Inside</Button>
    </Link>
    </div>
    </div>
</div>)
}