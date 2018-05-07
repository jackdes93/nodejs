// Connect to server
var socket = io("http://localhost:8000");
const CLIENT_REGISTER_USER = "Client-register-User";
const REQUEST_NOTIFI_T_CLIENT = "Request-Notification-To-Client";
const REQUEST_NOTIFI_F_SERVER = "Request-Notification-From-Server";

  $(document).ready(function(){
    $("#login-form").show();
    $("#content-chat").hide(100);
    $("input[name='txtUserName']").focus();

    $("input[name='btn-login']").click(function(){
      var txtUserName = $("input[name='txtUserName']").val();
      var txtPassWord = $("input[name='txtPassWord']").val();
      var data = {'username': txtUserName, 'password':txtPassWord};
      socket.emit(CLIENT_REGISTER_USER, data);
      socket.on(REQUEST_NOTIFI_T_CLIENT, function(message){
          if (message['status'] == '1') {
              $(".box-alert").addClass("fail");
              $("input[name='txtUserName']").val('');
              $("input[name='txtPassWord']").val('');
          } else {
              $(".box-alert").addClass("success");
              $('#login-form').hide();
              $('#content-chat').show();
          }
          $('#mess-content').text(message['message']);
          setTimeout(function() {
              $(".box-alert").removeClass("success");
              $(".box-alert").removeClass("fail");
              $('#notifi-content').text('');
              $('#mess-content').text('');
            }, 2000);
      });
      socket.on(REQUEST_NOTIFI_F_SERVER, function(data) {
        // console.log('access');
        console.log(data);
      });


    });

  });
