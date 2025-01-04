import React from "react";
import "./driverCard.css";

interface DriverCardProps {
  driver: {
    driverId: number;
    code: string;
    forename: string;
    surname: string;
  };
}

const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  const getDriverCode = (code: string | null, surname: string) => {
    return code ? code : surname.slice(0, 3).toUpperCase();
  };
  return (
    <div className="driver-card">
      <div className="driver-info">
        <span className="driver-code">
          {getDriverCode(driver.code, driver.surname)}
        </span>
        <span className="driver-name">
          {driver.forename} {driver.surname}
        </span>
      </div>
    </div>
  );
};

export default DriverCard;
