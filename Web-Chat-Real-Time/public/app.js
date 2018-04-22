// Connect to server
var socket = io("http://localhost:8000");
  $(document).ready(function(){
    $("#login-form").show();
    $("#content-chat").hide(100);
    $("input[name='txtUserName']").focus();

    $("input[name='btn-login']").click(function(){
      // $("#login-form").hide(2000);
      // $("#content-chat").show(3000);
      var txtUserName = $("input[name='txtUserName']").val();
      var txtPassWord = $("input[name='txtPassWord']").val();
      var data = {'username': txtUserName, 'password':txtPassWord};
      socket.emit("Client-register-User", data);
      socket.on("Request-Notification-To-Client", function(message){
          alert(message);
      });
    });


  });
