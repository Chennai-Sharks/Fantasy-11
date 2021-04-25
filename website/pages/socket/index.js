import React from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'ws://localhost:5000';

function App() {
	var match = '419120.json';
	var playerData = {
		players: [
			'MD Mishra',
			'AC Gilchrist',
			'A Mishra',
			'HH Gibbs',
			'DP Nannes',
			'Y Nagar',
			'S Ladda',
			'A Symonds',
			'UT Yadav',
			'RG Sharma',
			'MC Henriques',
		],
	};
	var socket = socketIOClient(ENDPOINT);
	// socket.on('test',(data)=>console.log(data))
	// 	socket.emit("test",  { hello: " message from client" });
	// or with emit() and custom event names
	//socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));

	socket.emit('startMatch', playerData, match);

	socket.on('score', (data) => console.log(data));
	// // handle the event sent with socket.send()
	socket.on('testreply', (data) => {
		console.log(data);
	});
	return <p>It's the client page</p>;
}

export default App;
