import { ProgressBar } from "react-bootstrap";

const ProgressSection = ({ progress }) => {
  return (
   <div className="mt-3">

      {!progress.complete && (
        <>
          <div className="text-center mb-1 fw-bold">
            {progress.percentage}%
          </div>

          <ProgressBar
            className="custom-progress"
            now={progress.percentage}
            variant={progress.variant}
          />

          <p className="text-center mt-2 mb-0">
            {progress.collected} / {progress.total} kaarten
          </p>

          <p className="text-center opacity-80 small mb-0">
            Nog <span className="fw-bold">{progress.missing}</span> kaarten te verzamelen
          </p>
        </>
      )}

      {progress.complete && (
        <div className="set-complete">
          🏆 <strong>Complete Set!</strong>
          <br />
          <small>
            Congratulations! You've collected every card in this expansion.
          </small>
        </div>
      )}

    </div>
  );
};

export default ProgressSection;