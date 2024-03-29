import { Redirect, useHistory } from "react-router";
import "./Introduce.css";
import { useSelector } from "react-redux";
import useSound from "use-sound";
import { motion } from "framer-motion";
// import { useEffect } from "react";
import MessengerCustomerChat from "react-messenger-customer-chat";


const Introduce = () => {
  const audioControl = useSelector((state) => state.audioControl);
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const user = useSelector(state => state.user);
  const history = useHistory();
  const handleStartButtonClick = (e) => {
    sound && playBtnClickAudio();
    history.push("/auth");
  };

  if(user){
    return <Redirect to="/lobby"/>
  }
  return (
    <div className="introduce">
      <div className="banner-title">Seahorse Chess</div>{" "}
      <motion.div
        className="container"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="banner-body">
          <div
            style={{ color: "#212122", textAlign: "center", fontSize: "32px" }}
          >
            Website game seahorses online
          </div>
          <div style={{ fontSize: "20px" }}>
            <div>🎉 All free</div>
            <div>🎉 Good connection - Outstanding quality </div>
            <div>🎉 Make friends, play with friends quickly</div>
          </div>
          <div
            style={{ textAlign: "left", lineHeight: "20px", fontSize: "18px" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seahorse chess is a very popular
            and familiar game in the memories of every Vietnamese people.
            Certainly just mentioning seahorse chess, anyone from a young age
            has since playing through this game not only once but many times,
            from gardens, parks or public place, just with one small place to
            put the table and you good to go , that is more than enough for a
            competition of only 2-4 people that you entertain together. <br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Over all
            ages, seahorse chess shows its appeal not only in its simple
            gameplay but extremely attractive, but sometimes it is the exciting
            moments when you kick someone's horse back to the barn. Or get
            enough of your horses to the finish line.
          </div>
          <button className="start-btn" onClick={handleStartButtonClick}>
            Start
          </button>
        </div>
      </motion.div>
      <div className="copyright">Copyright © 2021</div>
      <MessengerCustomerChat
        pageId="101530238693742"
        appId="3881449045268897"
      />
    </div>
  );
};
export default Introduce;
