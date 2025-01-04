import React, { useState, useEffect } from "react";
import "./drivers.css";
import DriverCard from "./components/DriverCard";

// Definir las interfaces fuera de la función
interface PaginationInfo {
  hasNext: boolean;
  currentPage: number;
  numberOfPages: number;
}

interface Result {
  paginationInfo: PaginationInfo;
  dto: Driver[];
}

interface Driver {
  driverId: number;
  driverRef: string;
  number: number;
  code: string;
  forename: string;
  surname: string;
  nationality: string;
}

function Drivers() {
  const [data, setData] = useState<Driver[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/drivers?pageNo=${page}`)
      .then((res) => res.json())
      .then((response: Result) => {
        setData(response.dto);
        setTotalPages(response.paginationInfo.numberOfPages);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [page]);

  return (
    <section>
      <article className="drivers-container">
        <div className="drivers-grid">
          {data.map((driver) => (
            <DriverCard key={driver.driverId} driver={driver} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Anterior
          </button>
          <span>
            Página {page + 1} de {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page + 1 === totalPages}
          >
            Siguiente
          </button>
        </div>
      </article>
    </section>
  );
}

export default Drivers;
