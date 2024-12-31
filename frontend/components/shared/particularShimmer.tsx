export default function ParticularShimmerUI(){
    return (
         <div className="relative h-full w-full">
      <div className="animate-pulse absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200"></div>
      <div className="relative z-10 p-2"></div>
      
      <div className="max-w-screen h-full">
        
            <div className="animate-pulse p-2 border border-gray-200 rounded-lgbg-white shadow-md">
            <div className="h-50 w-full p-2 border-2 border-gray-400 bg-gray-300 rounded-2xl">
            <div className="mt-4">
            <div className="h-10 border-2 border-gray-400 bg-gray-300 rounded-2xl w-3/4 flex justify-center items-center m-2 "></div>
            <div className="h-10 border-2 border-gray-400 bg-gray-300 rounded-2xl w-3/4 m-2 flex justify-center items-center"></div>
            <div className="flex flex-row justify-center items-center">
            <div className="h-6 border-2 border-gray-400 bg-gray-300 rounded-full w-1/4 m-2"></div>
            <div className="h-6 border-2 border-gray-400 bg-gray-300 rounded-full w-3/4 m-2"></div>
            </div>
          </div>
          <div className="">
            <div className="h-8 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-full w-1/4 m-2 "></div>
          </div>
                </div>
            </div>
      </div>
      </div>
    )

}