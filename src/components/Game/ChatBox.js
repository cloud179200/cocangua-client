import { useEffect, useState } from "react";
import avatar1 from "../../shared/media/image/ingame_Img_user_01.png";
import avatar2 from "../../shared/media/image/ingame_Img_user_02.png";
import avatar3 from "../../shared/media/image/ingame_Img_user_03.png";
import avatar4 from "../../shared/media/image/ingame_Img_user_04.png";
import avatar5 from "../../shared/media/image/ingame_Img_user_05.png";
import avatar6 from "../../shared/media/image/ingame_Img_user_06.png";
import { useSelector } from "react-redux";
import { socket } from "../../shared/socket/socket";

const ChatBox = (props) => {
  const { onClick } = props;
  const room = useSelector((state) => state.room);

  const [messages, setMessages] = useState([]);
  const [state, setState] = useState({
    message: "",
  });
  const handleInputChange = (e) => {
    setState({ [e.target.name]: e.target.value });
  };
  const handleSubmitSendMessageForm = (e) => {
    e.preventDefault();
    const message = state.message.trim();
    if (message.length > 0) {
    }
    setState({ ...state, message: "" });
  };
  const getAvatarPic = (avatarData) => {
    switch (avatarData) {
      case 1:
        return avatar1;
      case 2:
        return avatar2;
      case 3:
        return avatar3;
      case 4:
        return avatar4;
      case 5:
        return avatar5;
      case 6:
        return avatar6;
      default:
        break;
    }
  };

  useEffect(() => {
    socket &&
      socket.on("new-message", (res) => {
        console.log(res);
        //todo: get message from socket
        setMessages([...messages, {username: "vietanh2000", content: "Hello"}])
        // if(res.)
      });
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);
  return (
    <div className="chat-box">
      <div className="chat-box-head">
        <div className="chat-box-id">{room.roomId}</div>
        <div className="chat-box-close" onClick={onClick}>
          X
        </div>
      </div>
      <div
        className="chat-box-body"
        ref={(boxChatRef) => {
          if (boxChatRef) boxChatRef.scrollTop = boxChatRef.scrollHeight;
        }}
      >
        {messages.map((message) =>
          message.username === "vietanh20000" ? (
            <div className="message-mine">
              <div className="content">{message.content}</div>
            </div>
          ) : (
            <div className="message-other">
              <div
                className="avatar"
                style={{
                  backgroundImage: `url(${getAvatarPic(message.avatar)})`,
                }}
              ></div>
              <div className="content">{message.content}</div>
            </div>
          )
        )}
      </div>
      <form className="chat-box-foot" onSubmit={handleSubmitSendMessageForm}>
        <input
          placeholder="Type something here..."
          name="message"
          value={state.message}
          onChange={handleInputChange}
        />
        <button></button>
      </form>
    </div>
  );
};

export default ChatBox;
