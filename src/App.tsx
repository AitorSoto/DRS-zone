import { useState, useEffect } from "react";
import "./drivers.css";

// Definir la interfaz fuera de la función
interface Driver {
  driverId: number;
  driverRef: string;
  number: number;
  code: string;
  forename: string;
  surname: string;
  nationality: string;
}

function App() {
  const [data, setData] = useState<Driver[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/drivers")
      .then((res) => res.json())
      .then((drivers) => setData(drivers)) // Asegúrate de que los datos sean del tipo Driver[]
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const getImagePath = (forename: string, surname: string) => {
    return `/assets/${forename.toLowerCase()}_${surname.toLowerCase()}.avif`;
  };

  return (
    <div>
      <ul>
        {data.map((driver) => (
          <li key={driver.driverId}>
            <img
              src={getImagePath(driver.forename, driver.surname)}
              alt={`${driver.forename} ${driver.surname}`}
            />
            {driver.forename} {driver.surname}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
