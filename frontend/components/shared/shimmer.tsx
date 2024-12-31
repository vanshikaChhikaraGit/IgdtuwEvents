import { Skeleton } from "@/components/ui/skeleton"

export default function ShimmerUI(){
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {Array.from({length:8}).map(()=>(
            <div className="animate-pulse p-4 border border-gray-200 rounded-3xl-lgbg-white shadow-md">
            <div className="h-40 border-2 border-gray-400 bg-gray-300 rounded-3xl">
            <div className="mt-4">
            <div className="h-5 border-2 border-gray-400 bg-gray-300 rounded-full w-3/4 flex justify-center items-center m-2 "></div>
            <div className="h-4 border-2 border-gray-400 bg-gray-300 rounded w-3/4 m-2 flex justify-center items-center"></div>
            <div className="flex flex-row justify-center items-center">
            <div className="h-6 border-2 border-gray-400 bg-gray-300 rounded-3xl w-1/4 m-2"></div>
            <div className="h-6 border-2 border-gray-400 bg-gray-300 rounded-3xl w-3/4 m-2"></div>
            </div>
          </div>
          <div className="">
            <div className="h-8 border-2 border-gray-400 bg-gray-300 rounded-3xl w-1/4 m-2 "></div>
          </div>
                </div>
            </div>
        ))}
      </div>
      </div>
    )

}