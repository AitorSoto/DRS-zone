import React, { useState, useEffect, useRef, useDeferredValue } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./circuits.css";
import { useDebounce } from "../hooks/debounce";
import CircuitCard from "./CircuitCard";
import Chat from "./chat";

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
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const debouncedSearchTerm = useDebounce(deferredSearchTerm, 300);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  function fetchAllCircuits(pageNo: number): Promise<Result> {
    return fetch(`http://localhost:8080/circuits?pageNo=${pageNo}&pageSize=11`)
      .then((response) => response.json())
      .then((result: Result) => {
        setData(result.dto);
        setTotalPages(result.paginationInfo.numberOfPages + 1);
        return result;
      });
  }

  function fetchSearchedCircuits(term: string) {
    fetch(`http://localhost:8080/circuit/match?term=${term}`)
      .then((response) => response.json())
      .then((result: Circuit[]) => {
        setData(result);
        setTotalPages(0);
      });
  }

  const handleCircuitSearch = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handlePageChange = (newPage: number) => {
    let adjustedPage = Math.max(0, Math.min(newPage, totalPages - 1));
    setPage(adjustedPage);
    navigate(`?page=${adjustedPage + 1}`);
  };

  const handleCircuitClick = (driverId: number) => {
    navigate(`/circuits/${driverId}`);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get("page");
    const pageNo = pageParam ? Math.max(0, parseInt(pageParam, 10) - 1) : 0; // Convertir de 1-basado a 0-basado

    setPage(pageNo);
    if (debouncedSearchTerm.trim() === "") {
      fetchAllCircuits(page);
    } else {
      fetchSearchedCircuits(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, page, location.search]);

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
              onClick={() => handleCircuitClick(circuit.circuitId)}
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
      <Chat param={data} />
    </section>
  );
}

export default Circuits;
