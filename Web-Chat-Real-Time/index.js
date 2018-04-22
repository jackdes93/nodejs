var express = require("express");
var app = express();
var arrayDataUser = ['AAA','dev_pbinh'];
var message = "";
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8000);

io.on("connection", function(socket){
  console.log("Have connection with id: "+ socket.id);
    socket.on("disconnect", function(){
      console.log(socket.id + " disconnect");
    });
    socket.on("Client-register-User", function(data){
      if(arrayDataUser.indexOf(data['username']) >= 0){
        message = data['username'] + ' đã tồn tại trong hệ thống';
        socket.emit("Request-Notification-To-Client",message);
      } else {
        message = 'Bạn đã đăng ký thành công với username là '+ data['username'];
        socket.emit("Request-Notification-To-Client", message);
      }

    });
});

// Route
app.get("/", function(req, res){
  res.render("homepage");
});
