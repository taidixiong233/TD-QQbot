import RCONClient from "./RCONClient";

new RCONClient("127.0.0.1", 25575)
  .connect("maomao")
  .then((res) =>
    res
      .sendCommand("/list")
      .then((a) => console.log(a))
      .catch((err) => console.log(err))
  )
  .catch((err) => console.log(err));
