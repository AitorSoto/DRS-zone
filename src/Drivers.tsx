import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./drivers.css";
import DriverCard from "./components/DriverCard";
import { debounce } from "lodash";

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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchAllDrivers = useCallback(async (pageNo: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/drivers?pageNo=${pageNo}`
      );
      const result: Result = await response.json();
      setData(result.dto);
      setTotalPages(result.paginationInfo.numberOfPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const fetchDriversByName = useCallback(
    debounce(async (term: string) => {
      if (term.trim() !== "") {
        try {
          const response = await fetch(
            `http://localhost:8080/drivers/match?name=${term}`
          );
          const result: Driver[] = await response.json();
          setData(result);
          setTotalPages(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        fetchAllDrivers(page);
      }
    }, 300),
    [fetchAllDrivers, page]
  );

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchAllDrivers(page);
    } else {
      fetchDriversByName(searchTerm);
    }
  }, [searchTerm, page, fetchAllDrivers, fetchDriversByName]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDriverClick = (driverId: number) => {
    navigate(`/driver/${driverId}`);
  };

  return (
    <section>
      <article className="drivers-container">
        <input
          type="text"
          placeholder="Buscar pilotos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="drivers-grid">
          {data.map((driver) => (
            <div
              key={driver.driverId}
              onClick={() => handleDriverClick(driver.driverId)}
              className="driver-item"
            >
              <DriverCard driver={driver} />
            </div>
          ))}
        </div>
        {totalPages > 1 && (
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
        )}
      </article>
    </section>
  );
}

export default Drivers;
