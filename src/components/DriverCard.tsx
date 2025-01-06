import React from "react";
import "./driverCard.css";
import teamColors from "../data/teamColors.json";

interface DriverCardProps {
  driver: {
    driverId: number;
    code: string;
    forename: string;
    surname: string;
    currentConstructor: string;
  };
}

const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  const getDriverCode = (code: string | null, surname: string) => {
    return code ? code : surname.slice(0, 3).toUpperCase();
  };

  const getConstructorColor = (constructorName: string) => {
    const team = teamColors.find((team) => team.name === constructorName);
    return team ? team.color : "#000";
  };

  const constructorColor = getConstructorColor(driver.currentConstructor);

  return (
    <div
      className="driver-card "
      style={{ "--constructor-color": constructorColor } as React.CSSProperties}
    >
      <div className="driver-info">
        <span className="driver-code f1-font-bold">
          {getDriverCode(driver.code, driver.surname)}
        </span>
        <span className="driver-name f1-font">
          {driver.forename} {driver.surname}
        </span>
      </div>
    </div>
  );
};

export default DriverCard;
