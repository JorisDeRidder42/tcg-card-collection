import { ProgressBar } from "react-bootstrap";

const ProgressSection = ({ progress }) => {
  return (
    <div className="mt-3">
      <div className="text-center mb-1 fw-bold">
        {progress.percentage}%
      </div>

      <ProgressBar className="custom-progress"
        now={progress.percentage}
        variant={progress.variant}
      />

      <p className="text-center mt-2 mb-0">
        {progress.collected} / {progress.total} kaarten
      </p>
    </div>
  );
};

export default ProgressSection;