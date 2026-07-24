import { ProgressBar } from "react-bootstrap";

const ProgressSection = ({ progress }) => {
  return (
    <div className="progress-box">
      <div className="progress-text">
        <span>
          {progress.owned} / {progress.total} cards
        </span>

        <span className={`text-${progress.variant}`}>
          {progress.percentage}%
        </span>
      </div>

      <ProgressBar
        now={progress.percentage}
        variant={progress.variant}
      />
    </div>
  );
};

export default ProgressSection;