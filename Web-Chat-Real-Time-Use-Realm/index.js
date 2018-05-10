var express = require("express");
var realm = require("realm");
var app = express();
var arrayDataUser = [{'username' : 'admin', 'password' : 'admin', 'state' : 0}, { 'username' : 'jackdes', 'password' : '11235', 'state' : 0 }];
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
       if (arrayDataUser.length == 0) {
         arrayDataUser.push({'username': data['username'], 'password':data['password'], 'state' : 1});
         message = {'message':'Bạn đã đăng ký thành công với username là '+ data['username'], 'state' : 0, 'userLogin': data['username']};
         socket.emit(constants.REQUEST_NOTIFI_T_CLIENT, message);
       } else {
         checkUserIsHave(arrayDataUser, data, socket)
       }
       io.sockets.emit(constants.REQUEST_NOTIFI_F_SERVER, arrayDataUser);
    });

    socket.on(constants.CLIENT_LOGIN, function(data) {
       getLogin(socket, arrayDataUser, data['username'], data['password']);
    });
});

/*
  Some function for server
*/
function findIndexByKey(arrayDataUser, key, valueSearch) {
  for (var i = 0; i < arrayDataUser.length; i++) {
    if(arrayDataUser[i][key] == valueSearch)
    {
      return i;
    }
  }
  return -1;
}

function checkUserIsHave(arrayDataUser, data, socket) {
  if(findIndexByKey(arrayDataUser, 'username', data['username']) >= 0){
    message = {'message':data['username'] + ' đã tồn tại trong hệ thống', 'state' : 1, 'userLogin': ''};
  } else {
    message = {'message':'Bạn đã đăng ký thành công với username là '+ data['username'], 'state' : 0, 'userLogin': data['username']};
    arrayDataUser.push({'username': data['username'], 'password':data['password'], 'state' : 1});
  }
  socket.emit(constants.REQUEST_NOTIFI_T_CLIENT, message);
}

function getLogin(socket, arrayDataUser, username, password) {
  var index = findIndexByKey(arrayDataUser, 'username', username);
  if (index >= 0) {
     var state = (username != arrayDataUser[index]['username']) || (password != arrayDataUser[index]['password']) ? 0 : 1;
     var result = state == 0 ? {'message' : 'Tài khoản hoặc mật khẩu không chính xác.', 'state' : 0} : {'message' : 'Chúc mừng bạn đăng nhập thành công.', 'state' : 1};
     socket.emit(constants.SERVER_NOTIFI_LOGIN, result);
  } else {
    message = {'message' : 'Tài khoản này không tồn tại trong hệ thống', 'state' : 1};
    socket.emit(constants.REQUEST_NOTIFI_T_CLIENT, message);
  }
}
// Route
app.get("/", function(req, res){
  res.render("homepage");
});
