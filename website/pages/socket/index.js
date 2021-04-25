import React from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

function App() {
  var socket = socketIOClient(ENDPOINT);
  socket.on('test',(data)=>console.log(data))
// 	console.log("hello world");
  	socket.emit("test",  { hello: " message from client" });
// 	// or with emit() and custom event names
 	//socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
  
 
// // handle the event sent with socket.send()
 socket.on("testreply", (data) => {
	console.log(data);
  });
  return (
    <p>
      It's the client page 
    </p>
  );
}	
  
export default App;
