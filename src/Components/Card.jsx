const Card = ({ title, children }) => {
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">{title}</h2>

        {children}
      </div>
    </div>
  );
};

export default Card;
