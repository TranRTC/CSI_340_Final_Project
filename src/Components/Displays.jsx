import Display from "./Display";

const Displays = ({ weatherData, onRemove }) => {
  return (
    <div className="displays-container">
      {weatherData.length === 0 ? (
        <p>No weather data available. Search for a city to add.</p>
      ) : (
        weatherData.map((data, index) => (
          <Display key={index} data={data} onRemove={onRemove} />
        ))
      )}
    </div>
  );
};

export default Displays;
