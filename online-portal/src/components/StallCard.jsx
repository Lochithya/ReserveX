import "./StallCard.css";

const StallCard = ({ stall, isSelected, onSelect }) => {
  let className = "stall-card";

  if (!stall.available) className += " reserved";
  else if (isSelected) className += " selected";

  return (
    <div
      className={className}
      onClick={() => stall.available && onSelect(stall.id)}
    >
      <h4>{stall.name}</h4>
      <p>{stall.size}</p>
    </div>
  );
};

export default StallCard;
