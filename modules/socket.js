import { Server } from "socket.io";
import { defineNuxtModule } from "@nuxt/kit";

const userMap = {};

function buildMessage(who, what, nickname, type) {
  return { id: who.id, message: what, nickname: nickname, type: type};
}

export default defineNuxtModule({
  setup(_, nuxt) {
    nuxt.hook("listen", (server) => {
      const io = new Server(server);

      nuxt.hook("close", () => io.close());

      io.on("connect", (socket) => {
        socket.emit("message", buildMessage(socket, `welcome ${socket.id}`));
        userMap[socket.id] = { nickname: null, connected: true };

        socket.on('setNickname', (nickname) => {
          userMap[socket.id].nickname = nickname;
            io.emit(
              "message",
              buildMessage(socket, `${socket.id} joined`, userMap[socket.id].nickname, 'joined')
            );
        });

        socket.on('chat message', (content, isLink, isImg) => {
          socket.broadcast.emit('chat message', 
          { msg: content,
            nickname: userMap[socket.id].nickname,
            connected: userMap[socket.id].connected,
            isLink: isLink,
            img: isImg
          });
        })

        socket.on('activity', (type) => {
          socket.broadcast.emit('message', { msg: `activity`, nickname: userMap[socket.id].nickname, type});
        })

        socket.on('left', (type) => {
          userMap[socket.id].connected = false;
          socket.broadcast.emit(
            "message",
            buildMessage(socket, `${socket.id} left`, userMap[socket.id].nickname, 'left')
          );
        })
      });
    });
  },
});