import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Await } from 'react-router-dom';
import { useChat } from '../Context/ChatContext';

function SearchBar() {
   const {setsearchValue,searchValue}=useChat()
  return (
    <div >
          {/* searchbar  */}
             <div className="w-full bg-white absolute top-20 border border-black flex items-center justify-between  ">

                <input
                value={searchValue}
                onChange={(e)=>{setsearchValue(e.target.value)}}
                
                className="p-1 border-none outline-none" type="text" name="" id="" placeholder="Search..."  />
                <SearchIcon  className="text-black mr-2" /> 
            </div>

          

            

        
      
    </div>
  )
}

export default SearchBar
