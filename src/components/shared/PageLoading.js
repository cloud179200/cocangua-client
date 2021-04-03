import { useSelector } from "react-redux";
import useSound from "use-sound";
import "./PageLoading.css";

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
const PageLoading = () => {
  const { sound, btnClickAudio } = useSelector((state) => state.audioControl);
  const [playBtnClickAudio] = useSound(btnClickAudio);
  return (
    <div className="page-loading">
      <div className="page-loading-title">Seahorse WebGame</div>
      <div className="page-loading-waifu"></div>
      <div className="tips-and-loading-content-container">
        <div className="tips">PRO Tip: Incense for ancestors to get more luck</div>
        <div className="loading-content">
          Loading&nbsp;<div>.</div>&nbsp;
          <div>.</div>
          &nbsp;<div>.</div>
        </div>
      </div>
      <div
        className="visit-fanpage"
        onClick={() => {
          sound && playBtnClickAudio();
          openInNewTab(
            "https://www.facebook.com/SeaHorse-Game-101530238693742"
          );
        }}
      >
        Visit Fanpage
      </div>
    </div>
  );
};
export default PageLoading;
