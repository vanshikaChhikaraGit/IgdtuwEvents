import { FaMusic, FaPaintBrush, FaBookOpen, FaRunning, FaUsers } from "react-icons/fa";
import { GiTheater } from "react-icons/gi";

export function useSocietyTypeIcon(type:string){

    switch (type.toLowerCase()) {
        case "dance":
          return <img src="assets/images/dancing.png"  className="m-2 h-10 w-12"></img>
        case "music":
          return <img src="assets/images/music.png" className="m-2 h-10 w-12"></img>
        case "drama":
          return <img src="assets/images/theater.png" className="m-2 h-10 w-12"></img>
        case "art":
          return <img src="assets/images/art.png" className="m-2 h-10 w-12"></img>
        case "technical":
          return <img src="assets/images/technical.png" className="m-2 h-10 w-12"></img>
        case "literary":
          return  <img src="assets/images/book.png" className="m-2 h-10 w-12"></img>
        case "sports":
          return <img src="assets/images/running.png" className="m-2 h-10 w-12"></img>
        default:
          return <FaUsers className="text-cyan-600 text-4xl" />; // Default icon
      }
}