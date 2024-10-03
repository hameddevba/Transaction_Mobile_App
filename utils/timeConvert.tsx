export function formatDateTime() {
   const now = new Date();
   
   // Extract date components
   const day = String(now.getDate()).padStart(2, '0');
   const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
   const year = now.getFullYear();
   
   // Extract time components
   const hours = String(now.getHours()).padStart(2, '0');
   const minutes = String(now.getMinutes()).padStart(2, '0');
   const seconds = String(now.getSeconds()).padStart(2, '0');
   
   // Format the date and time
   const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
   
   return formattedDateTime;
}


export const convertDate=(timestamp:number)=>{

   const date = new Date(timestamp);

   // Extract the day, month, and year
   const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
   const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
   const year = date.getFullYear();
   // Format the date as DD/MM/YYYY
   const formattedDate = `${day}/${month}/${year}`;

   return formattedDate;
}