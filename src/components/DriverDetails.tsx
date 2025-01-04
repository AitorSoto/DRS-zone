import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Driver {
  driverId: number;
  driverRef: string;
  number: number;
  code: string;
  forename: string;
  surname: string;
  nationality: string;
}

const DriverDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [driver, setDriver] = useState<Driver | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/drivers/byId/${id}`)
      .then((res) => res.json())
      .then((data) => setDriver(data))
      .catch((error) => console.error("Error fetching driver data:", error));
  }, [id]);

  if (!driver) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {driver.forename} {driver.surname}
      </h1>
      <p>Code: {driver.code == null ? "Retired" : driver.code}</p>
      <p>Number: {driver.number == 0 ? "Retired" : driver.number}</p>
      <p>Nationality: {driver.nationality}</p>
      {/* Añade más detalles según sea necesario */}
    </div>
  );
};

export default DriverDetails;
