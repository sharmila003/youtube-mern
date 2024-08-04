import  Sidebar  from '../components/Sidebar';
import Bodycomponent from '../components/Bodycomponent';

export default function home() {
  return (
   <div   className='app'>
     <div   className="flex">
     <Sidebar/>
     <Bodycomponent/>
     </div>
   </div>
  )
}