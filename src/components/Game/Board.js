import "./Game.css";
import Square from "./Square";

const Board = () => {
  return (
    <div className="game">
      <div className="pink block-container">
        <div className="booth-container">
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
        </div>
        <div className="normal-1-5-container">
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
        </div>
        <div className="normal-6-9-container">
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
        </div>
      </div>
      <div className="blue block-container">
        <div className="booth-container">
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
        </div>
        <div className="normal-1-5-container">
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
        </div>
        <div className="normal-6-9-container">
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
        </div>
      </div>
      <div className="green block-container">
        <div className="booth-container">
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
        </div>
        <div className="normal-1-5-container">
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
        </div>
        <div className="normal-6-9-container">
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
        </div>
      </div>
      <div className="yellow block-container">
        <div className="booth-container">
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
          <Square type="booth" color="blue" />
        </div>
        <div className="normal-1-5-container">
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
        </div>
        <div className="normal-6-9-container">
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
          <Square type="normal" color="blue" wrapper={true} />
        </div>
      </div>
    </div>
  );
};
export default Board;
