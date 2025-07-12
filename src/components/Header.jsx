import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from "./SearchBar";
function Header() {
    const [show, setshow] = useState(false)
       const [search,setsearch]=useState(false)
         const searchButton =()=>{
        setsearch(!search)
    }
 


    const togglebutton = () => {
        setshow(!show)
    }

    return (
        <div className="bg-blue-600  h-20   relative ">
            <div className=" w-full   flex  justify-between items-center   absolute top-3   ">
                <div className="  text-[36px]     text-amber-950 font-extrabold pl-2">Let's Chat </div>
                <p className=" " ><SearchIcon onClick={searchButton}  className="text-white" /> <CameraAltIcon  className=" ml-3 mr-4 text-white "/> <MoreVertIcon onClick={togglebutton}  className=" text-white text-xl cursor-pointer" /> </p>
            </div>

          {/* searchBar  */}
          {
            search &&(

                <SearchBar />
            )
          }
            

            {/* list  */}
            {
                show && (
                    <div className=" bg-black border  w-44   absolute right-2 top-20 ">
                        <ul className="p-2 border-b">
                            <li><Link className=" text-white text-xl" to={""}> Profile </Link></li>
                        </ul>
                         <ul className="p-2   border-b" >
                            <li><Link className="text-white text-xl" to={""}> Setting </Link></li>
                        </ul>
                         <ul className="p-2  border-b">
                            <li><Link className="text-white  text-xl" to={"/logout"}> Logout </Link></li>
                        </ul>
                    </div>
                )
            }



        </div>
    );
}

export default Header;
