import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addPlace } from "../../actions";

const Square = (props) => {
  const { color, type, order } = props;
  const squareRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (squareRef) {
      const {
        bottom,
        right,
        width,
        height,
      } = squareRef.current.getBoundingClientRect();
      dispatch(addPlace({ [order]: { bottom, right, width, height } }));
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      ref={squareRef}
      className="square"
      style={{ backgroundColor: color, borderRadius: "15px" }}
    >
      {type === "normal" && <div style={{ width: "80%", height: "80%", backgroundColor:"white", borderRadius:"15px" }}></div>}
    </div>
  );
};

export default Square;
