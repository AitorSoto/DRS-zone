import React from "react";
import "./constructorCard.css";

interface ConstructorCardProps {
  constructorName: string;
}

const ConstructorCard: React.FC<ConstructorCardProps> = ({
  constructorName,
}) => {
  const getConstructorImagePath = (name: string) => {
    return `../assets/constructors/${name
      .toLowerCase()
      .replace(/\s+/g, "")}.avif`;
  };

  return (
    <div className="constructor-card">
      <img
        src={getConstructorImagePath(constructorName)}
        alt={constructorName}
        className="constructor-image"
      />
    </div>
  );
};

export default ConstructorCard;
