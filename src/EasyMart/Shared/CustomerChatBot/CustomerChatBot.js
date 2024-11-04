import { useEffect } from "react";
import "./CustomerChatBot.css";

const CustomerChatBot = () => {
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "2635cfaf3214b40883d83a23a8ae0fba3",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return null;
};

export default CustomerChatBot;
