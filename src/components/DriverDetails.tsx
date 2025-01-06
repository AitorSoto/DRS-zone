import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConstructorCard from "./ConstructorCard";
import "./driverDetails.css";

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
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [constructors, setConstructors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const driverResponse = await fetch(
          `http://localhost:8080/drivers/byId/${id}`
        );
        const driverData = await driverResponse.json();
        setDriver(driverData);

        const constructorsResponse = await fetch(
          `http://localhost:8080/constructor/byDriverId/${id}`
        );
        const constructorsData = await constructorsResponse.json();
        setConstructors(constructorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!driver) {
    return <div>The selected driver does not exist</div>;
  }

  return (
    <div>
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver
      </button>
      <h1 className="f1-font-bold">
        {driver.forename} {driver.surname}
      </h1>
      <p className="f1-font">
        Code: {driver.code == null ? "Retired" : driver.code}
      </p>
      <p className="f1-font">
        Number: {driver.number == 0 ? "Retired" : driver.number}
      </p>
      <p className="f1-font">Nationality: {driver.nationality}</p>
      <div className="constructors-list">
        {constructors.map((constructor) => (
          <ConstructorCard key={constructor} constructorName={constructor} />
        ))}
      </div>
    </div>
  );
};

export default DriverDetails;
