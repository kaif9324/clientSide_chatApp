const FormateLastSeen =(timestamp)=>{
    if(!timestamp) return "unknown";

    const lastSeen = new Date(timestamp); //this is lastDate of the user / lastSeen
    const now = new Date()  // current date

    const isToday= lastSeen.toDateString() === now.toDateString() //if it is true then this is last seen of today
    const yesterday = new Date();
    yesterday.setDate(now.getDate()-1); // if today is 12 date so it minus 1 (12-1)= 11
    const isyesterday = lastSeen.toDateString()===yesterday.toDateString(); // so it compare yesterdate with lastseen date

    // now manage the time system 

    const time = lastSeen.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
    const DateFormate = lastSeen.toLocaleDateString("en-GB",{
        day:"numeric",
        month:"short",
        year:"numeric"
    })

    if(isToday) return `Today at ${time}`;
    if(isyesterday) return `yesterday at ${time}`;
    return `on ${DateFormate } at ${time}`

}
export default FormateLastSeen;