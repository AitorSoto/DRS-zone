// filepath: /Users/aitorsotojimenez/proyectos/f1/front/f1-web/src/components/Circuits.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./circuits.css";
import { useDebounce } from "../hooks/debounce";
import CircuitCard from "./CircuitCard";

interface Circuit {
  circuitId: number;
  name: string;
  country: string;
}

interface PaginationInfo {
  hasNext: boolean;
  currentPage: number;
  numberOfPages: number;
}

interface Result {
  paginationInfo: PaginationInfo;
  dto: Circuit[];
}

function Circuits() {
  const [data, setData] = useState<Circuit[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  function fetchAllCircuits(
    pageNo: number,
    searchTerm: string
  ): Promise<Result> {
    return fetch(
      `http://localhost:8080/circuits?pageNo=${pageNo}&pageSize=11&search=${searchTerm}`
    )
      .then((response) => response.json())
      .then((result: Result) => {
        setData(result.dto);
        setTotalPages(result.paginationInfo.numberOfPages + 1);
        return result;
      });
  }

  const handleCircuitSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    let adjustedPage = Math.max(0, Math.min(newPage, totalPages - 1));
    setPage(newPage);
    navigate(`?page=${adjustedPage}`);
  };

  const handleDriverClick = (driverId: number) => {
    navigate(`/circuits/${driverId}`);
  };

  useEffect(() => {
    fetchAllCircuits(page, debouncedSearchTerm);
  }, [page, debouncedSearchTerm]);

  return (
    <section>
      <article className="circuits-container">
        <div className="circuits-grid">
          <input
            type="text"
            placeholder="Search circuits..."
            value={searchTerm}
            onChange={handleCircuitSearch}
            className="input-search f1-font"
            ref={searchInputRef}
          />
          {data.map((circuit) => (
            <div
              key={circuit.circuitId}
              onClick={() => handleDriverClick(circuit.circuitId)}
              className="circuit-item"
            >
              <CircuitCard circuit={circuit} />
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

export default Circuits;
