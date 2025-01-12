import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useDeferredValue,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./drivers.css";
import DriverCard from "./DriverCard";
import { useDebounce } from "../hooks/debounce";

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
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const fetchDriversByName = useCallback(async (term: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/drivers/match?name=${term}`
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
  }, []);

  const debouncedSearchTerm = useDebounce(deferredSearchTerm, 300);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get("page");
    const pageNo = pageParam ? Math.max(0, parseInt(pageParam, 10) - 1) : 0; // Convertir de 1-basado a 0-basado

    setPage(pageNo);

    if (debouncedSearchTerm.trim() === "") {
      fetchAllDrivers(pageNo);
    } else {
      fetchDriversByName(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, location.search]);

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchTerm = event.target.value;
    await setSearchTerm(newSearchTerm);
  };

  const handleDriverClick = (driverId: number) => {
    navigate(`/driver/${driverId}`);
  };

  const handlePageChange = (newPage: number) => {
    let adjustedPage = Math.max(0, Math.min(newPage, totalPages - 1)); // Dentro del rango [0, totalPages - 1]

    setPage(adjustedPage);
    navigate(`?page=${adjustedPage + 1}`); // Ajustar para mostrar desde 1 en la URL
  };

  return (
    <section>
      <article className="drivers-container">
        <div className="drivers-grid">
          <input
            type="text"
            placeholder="Search drivers..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input f1-font"
            ref={searchInputRef}
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
              Previous
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page + 1 === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </article>
    </section>
  );
}

export default Drivers;
