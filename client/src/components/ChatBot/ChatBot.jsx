import React, { Component } from "react";

export default class ChatBot extends Component {
  componentDidMount() {

    (function(d, m){
        var kommunicateSettings = 
            {"appId":"290640f5f9244e9dace96047b4f3331ac","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }
  render() {
    return (
      <>
      </>
    )
  }

}