import socketIO from "socket.io-client";

const socket = socketIO.connect("http://192.168.18.130:4000/");
// const socket = socketIO.connect(`${process.env.REACT_APP_API_SOCKET}`);

export default socket;
