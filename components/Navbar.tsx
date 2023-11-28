import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile } from '@fortawesome/free-solid-svg-icons';


export default function Navbar(){
 return (
    <nav className="bg-green-800 p-2">
    <div className="container mx-auto flex items-center justify-between">
      <div className="text-white text-lg font-bold"><FontAwesomeIcon icon={faMobile} className="ml-1" />Contact manager</div>
    
    </div>
  </nav>
 
 );
}