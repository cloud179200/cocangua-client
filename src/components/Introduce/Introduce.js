import { useHistory } from "react-router";
import BackgroundImage from "../../shared/media/image/background.jpg";
import "./Introduce.css";
const Introduce = () => {
  const history = useHistory();
  const handleStartButtonClick = () => {
    history.push("/auth");
  };
  return (
    <div
      className="introduce"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <div className="banner-title">Seahorse Chess</div>
      <div className="banner-body">
        <div
          style={{ color: "#212122", textAlign: "center", fontSize: "32px" }}
        >
          Website game seahorses online
        </div>
        <div style={{fontSize:"20px"}}>
          <div>🎉 All free</div>
          <div>🎉 Good connection - Outstanding quality </div>
          <div>🎉 Make friends, play with friends quickly</div>
        </div>
        <div style={{ textAlign: "left", lineHeight: "20px", fontSize:"18px"}}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seahorse is a very popular and familiar game in the memories of
          every Vietnamese people. Certainly just mentioning seahorse chess,
          anyone from a young age has since playing through this game not only
          once but many times, from gardens, parks or public people, just over 1
          paragraph. The ground is enough to place the chess board, that is more
          than enough for a competition of only 2-4 people that you entertain
          together. Over all ages, seahorse chess shows its appeal not only in
          its simple gameplay but extremely attractive, but sometimes it is the
          exciting moments when you kick someone's horse back to the barn. Or
          get enough of your horses to the finish line.
        </div>
        <button className="start-btn" onClick={handleStartButtonClick}>
          Start
        </button>
      </div>
      <div className="copyright">Copyright © 2021</div>
    </div>
  );
};
export default Introduce;
