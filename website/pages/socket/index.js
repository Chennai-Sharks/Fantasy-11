import React,{ useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

function App() {
  var socket = socketIOClient(ENDPOINT);
  socket.on('test',(data)=>console.log(data))
  return (
    <p>
      It's the client page 
    </p>
  );
}	
// 	console.log("hello world");
// 	socket.emit("test", " hello world from client ");
// 	// or with emit() and custom event names
// 	//socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
//   });

// // handle the event sent with socket.send()
// socket.on("testreply", (data) => {
// 	console.log(data);
//   });

  

  
export default App;
