import React from "react";

const FourZeroFour = () => {
  useLayoutEffect(() => {
    document.title = "Hyperactyl - 404";
  });
  return (<div className="container">
    <video src="/assets/videos/video.mp4" id="video" autoPlay loop height={"100%"} width={"100%"}></video>
    404 Seems like ghost got you
  </div>)
};

export default FourZeroFour;
