import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8092);
  store.subscribe( () => {
    return io.emit(store.getState().toJS());
  });

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
  
}
