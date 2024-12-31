import { FaMusic, FaPaintBrush, FaBookOpen, FaRunning, FaUsers } from "react-icons/fa";
import { GiTheater } from "react-icons/gi";

export function useSocietyTypeIcon(type:string){

    switch (type.toLowerCase()) {
        // case "dance":
        //   return <GiDancer className="text-cyan-600 text-xl" />;
        case "music":
          return <FaMusic className="text-cyan-600 text-xl" />;
        case "drama":
          return <GiTheater className="text-cyan-600 text-xl" />;
        case "art":
          return <FaPaintBrush className="text-cyan-600 text-xl" />;
        case "technical":
          return <FaUsers className="text-cyan-600 text-xl" />;
        case "literary":
          return <FaBookOpen className="text-cyan-600 text-xl" />;
        case "sports":
          return <FaRunning className="text-cyan-600 text-xl" />;
        default:
          return <FaUsers className="text-cyan-600 text-xl" />; // Default icon
      }
}