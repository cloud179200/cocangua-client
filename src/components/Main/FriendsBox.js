import backgroundSquareFriends from "../../shared/media/image/background_sqare.png"
import backgroundFriendsBox from "../../shared/media/image/background_friendsbox.png"


const FriendsBox = () => {
  return <div className="friends-box" style={{backgroundImage: `url(${backgroundFriendsBox})`}}><div className="friends-box-title">Friend</div><div className="square-firends" style={{backgroundImage: `url(${backgroundSquareFriends})`}}></div></div>;
};
export default FriendsBox;
