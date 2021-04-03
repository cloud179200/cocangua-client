import blueBlock from "../../shared/media/image/square_blue_normal.png";
import greenBlock from "../../shared/media/image/square_green_normal.png";
import pinkBlock from "../../shared/media/image/square_pink_normal.png";
import yellowBlock from "../../shared/media/image/square_yellow_normal.png";
import blueBooth from "../../shared/media/image/booth_blue.png";
import greenBooth from "../../shared/media/image/booth_green.png";
import pinkBooth from "../../shared/media/image/booth_pink.png";
import yellowBooth from "../../shared/media/image/booth_yellow.png";
import finishBlock from "../../shared/media/image/finish.png";
import whiteWrapper from "../../shared/media/image/white_wrapper.png";

const Square = (props) => {
  const { color, type, wrapper } = props;
  const block = () => {
    // eslint-disable-next-line default-case
    switch (type) {
      case "normal":
        // eslint-disable-next-line default-case
        switch (color) {
          case "yellow":
            return yellowBlock;
          case "pink":
            return pinkBlock;
          case "green":
            return greenBlock;
          case "blue":
            return blueBlock;
        }
        break;
      case "booth":
        // eslint-disable-next-line default-case
        switch (color) {
          case "yellow":
            return yellowBooth;
          case "pink":
            return pinkBooth;
          case "green":
            return greenBooth;
          case "blue":
            return blueBooth;
        }
        break;
      case "finish":
        return finishBlock;
    }
  };
  return (
    <div className="square" style={{ backgroundImage: `url(${block()})` }}>
      {wrapper && (
        <div
          className="white-wrapper"
          style={{ backgroundImage: `url(${whiteWrapper})` }}
        ></div>
      )}
    </div>
  );
};

export default Square;
