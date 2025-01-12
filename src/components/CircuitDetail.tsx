import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CircuitDetail.css";

interface Winner {
  driverId: number;
  driverName: string;
  victories: number;
}

interface CircuitWinners extends Array<Winner> {}

interface CircuitDetailsProps {
  circuitId: number;
  circuitRef: string;
  name: string;
  location: string;
  country: string;
}

const CircuitDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [winnersData, setWinnersData] = useState<CircuitWinners>([]);
  const [circuitData, setCircuitData] = useState<CircuitDetailsProps>();

  function fetchAllWinners(): Promise<CircuitWinners> {
    return fetch(`http://localhost:8080/circuit/winnersOf?circuitId=${id}`)
      .then((response) => response.json())
      .then((result: CircuitWinners) => {
        setWinnersData(result);
        return result;
      });
  }

  function fetchCircuit(): Promise<CircuitDetailsProps> {
    return fetch(`http://localhost:8080/circuit/${id}`)
      .then((response) => response.json())
      .then((result: CircuitDetailsProps) => {
        setCircuitData(result);
        return result;
      });
  }

  useEffect(() => {
    fetchAllWinners();
    fetchCircuit();
  }, [id]);

  return (
    <div className="circuit-details">
      <h1 className="f1-font-bold long-words">{circuitData?.name}</h1>
      <p className="f1-font">
        {circuitData?.location} - {circuitData?.country}
      </p>
      <h2 className="f1-font-bold">Circuit Image</h2>
      {circuitData && (
        <div className="circuit-image-container">
          <img
            src={`../../assets/circuits/${circuitData.circuitRef}.avif`}
            alt="Circuit"
            className="circuit-image"
          />
        </div>
      )}
      <div className="podium">
        {winnersData.slice(0, 3).map((winner, index) => (
          <div
            key={winner?.driverId}
            className={`podium-place place-${index + 1}`}
          >
            <p className="podium-name f1-font">{winner?.driverName}</p>
            <p className="podium-victories f1-font">
              {winner?.victories} victories
            </p>
          </div>
        ))}
      </div>
      <table className="winners-table">
        <thead>
          <tr>
            <th className="f1-font-bold">Driver Name</th>
            <th className="f1-font-bold">Victories</th>
          </tr>
        </thead>
        <tbody>
          {winnersData.slice(3).map((winner) => (
            <tr key={winner.driverId}>
              <td className="f1-font">{winner.driverName}</td>
              <td className="f1-font">{winner.victories}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CircuitDetails;
