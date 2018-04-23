var express = require("express");
var app = express();
var arrayDataUser = ['AAA','dev_pbinh'];
var message = {};
var constants = require('./public/constvariable');
//  Set some propertise
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
    socket.on(constants.CLIENT_REGISTER_USER, function(data){
      if(arrayDataUser.indexOf(data['username']) >= 0){
        message = {'message':data['username'] + ' đã tồn tại trong hệ thống', 'status' : 1};
        socket.emit(constants.REQUEST_NOTIFI_T_CLIENT,message);
      } else {
        message = {'message':'Bạn đã đăng ký thành công với username là '+ data['username'], 'status' : 0};
        socket.emit(constants.REQUEST_NOTIFI_T_CLIENT, message);
      }

    });
});

// Route
app.get("/", function(req, res){
  res.render("homepage");
});
