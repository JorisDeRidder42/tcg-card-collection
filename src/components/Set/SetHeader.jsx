import ProgressSection from "../ProgressSection";

const SetHeader = ({ currentSet, progress }) => {
  return (
    <section className="set-header">

      {currentSet.logo && (
        <img
          src={currentSet.logo + ".png"}
          alt={currentSet.name}
          className="set-detail-logo"
        />
      )}

      <h1 className="set-title">
        {currentSet.name}
      </h1>


      <div className="set-info">

        <span>
          <img src={currentSet.symbol + ".png"} alt={currentSet.name} width={20} />
        </span>

        <span>
          Official: {currentSet.cardCount.official}
        </span>

        <span>
          Total: {currentSet.cardCount.total}
        </span>

      </div>


      <ProgressSection progress={progress} />

    </section>
  );
};

export default SetHeader;