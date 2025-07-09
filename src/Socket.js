import {io} from 'socket.io-client';
const token = localStorage.getItem('token');

const socket = io(import.meta.env.VITE_API_URL,{
   autoConnect:false
});

export default socket;