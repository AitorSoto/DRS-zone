import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  currentConstructor: string;
}

function Drivers() {
  const [data, setData] = useState<Driver[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchAllDrivers = useCallback(async (pageNo: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/drivers?pageNo=${pageNo}`
      );
      const result: Result = await response.json();
      const driversWithConstructors = await Promise.all(
        result.dto.map(async (driver) => {
          const constructorResponse = await fetch(
            `http://localhost:8080/constructor/byDriverId/${driver.driverId}`
          );
          const constructorData = await constructorResponse.json();
          driver.currentConstructor = constructorData[0];
          return driver;
        })
      );
      setData(driversWithConstructors);
      setTotalPages(result.paginationInfo.numberOfPages + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const fetchDriversByName = useCallback(
    debounce(async (term: string, pageNo: number) => {
      if (term.trim() !== "") {
        try {
          const response = await fetch(
            `http://localhost:8080/drivers/match?name=${term}&pageNo=${pageNo}`
          );
          const result: Driver[] = await response.json();
          const driversWithConstructors = await Promise.all(
            result.map(async (driver) => {
              const constructorResponse = await fetch(
                `http://localhost:8080/constructor/byDriverId/${driver.driverId}`
              );
              const constructorData = await constructorResponse.json();
              driver.currentConstructor = constructorData[0];
              return driver;
            })
          );
          setData(driversWithConstructors);
          setTotalPages(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        fetchAllDrivers(pageNo);
      }
    }, 300),
    [fetchAllDrivers]
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get("page");
    const pageNo = pageParam ? parseInt(pageParam, 10) - 1 : 0; // Restar 1 para manejar internamente desde 0
    setPage(pageNo);

    if (searchTerm.trim() === "") {
      fetchAllDrivers(pageNo);
    } else {
      fetchDriversByName(searchTerm, pageNo);
    }
  }, [searchTerm, location.search, fetchAllDrivers, fetchDriversByName]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDriverClick = (driverId: number) => {
    navigate(`/driver/${driverId}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate(`?page=${newPage + 1}`); // Sumar 1 para mostrar en la URL desde 1
  };

  return (
    <section>
      <article className="drivers-container">
        <div className="drivers-grid">
          <input
            type="text"
            placeholder="Buscar pilotos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
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
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
            >
              Anterior
            </button>
            <span>
              Página {page + 1} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
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
