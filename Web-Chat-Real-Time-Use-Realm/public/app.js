// Connect to server
var socket = io("http://192.168.1.5:8000");
const CLIENT_REGISTER_USER = "Client-register-User";
const REQUEST_NOTIFI_T_CLIENT = "Request-Notification-To-Client";
const REQUEST_NOTIFI_F_SERVER = "Request-Notification-From-Server";

socket.on(REQUEST_NOTIFI_F_SERVER, function(data) {
    $('.list-friend').empty();
  for(var i = 0; i < data.length; i++) {
    $('.list-friend').append('<p>' + data[i]['username'] + '</p>');
  }
});


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
              $('#title-name').text(message['userLogin']);
          }
          $('#mess-content').text(message['message']);
          setTimeout(function() {
              $(".box-alert").removeClass("success");
              $(".box-alert").removeClass("fail");
              $('#notifi-content').text('');
              $('#mess-content').text('');
            }, 2000);
      });
    });
  });
