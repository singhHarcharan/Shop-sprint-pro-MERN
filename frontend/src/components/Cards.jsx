const Cards = (ProductName,Price,Image) => {
  return (
    <div className="col-md-3">
      <div className="card">
        <img src={Image} alt="" />
        <div className="card-body">
          <h4>{ProductName}</h4>
          <span className="text-success">{Price}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards