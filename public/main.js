let divSelectConnectionId = document.getElementById("select");
let divconsultingRoom = document.getElementById("consultingRoom");

let inputconnectionId = document.getElementById("connectionId");
let btnConnectToId = document.getElementById("connectToId");

let localVideo = document.getElementById("localVideo");
let remoteVideo = document.getElementById("remoteVideo");

let connectionIdNumber, localStream, remoteStream, rtcPeerConnection, isCaller;

const iceServers = {
  iceServer: [
    { urls: "stun:stun.service.mozilla.com" },
    { urls: "stun.stun.l.service.google.com:19302" },
  ],
};

const streamConstraints = {
  audio: true,
  video: true,
};

btnConnectToId.onclick = () => {
  console.log("clicked");
  if (inputconnectionId.value == "") {
    alert("itroducce algo  para la conexion");
  } else {
    navigator.mediaDevices
      .getUserMedia(streamConstraints)
      .then((stream) => {
        localStream = stream;
        localVideo.srcObject = stream;
      })
      .catch((err) => console.log(err));

    divSelectConnectionId.style = "display: none";
    divconsultingRoom.style = "diplay: block";
  }
};
