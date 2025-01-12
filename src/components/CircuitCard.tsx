import React from "react";
import "./CircuitCard.css";
import circuitSchedule from "../data/circuitSchedule.json";

interface CircuitProps {
  circuit: {
    circuitId: number;
    name: string;
    country: string;
  };
}

const CircuitCard: React.FC<CircuitProps> = ({ circuit }) => {
  const getSchedule = (circuitName: string) => {
    const foundCircuit = circuitSchedule.circuits.find(
      (c) => c.name === circuitName
    );
    return foundCircuit ? foundCircuit.time : "No schedule available";
  };

  const schedule = getSchedule(circuit.name);

  const getStyles = (time: string) => {
    if (time === "Day") {
      return { backgroundColor: "#87CEEB", color: "#333" };
    } else if (time === "Night") {
      return { backgroundColor: "#1E1E60", color: "#E0E0FF" };
    } else {
      return { backgroundColor: "#F5F5F5", color: "#555" };
    }
  };

  const styles = getStyles(schedule);

  return (
    <div className="circuit-card">
      <div key={circuit.circuitId} className="circuit-item" style={styles}>
        <h2 className="f1-font-bold">{circuit.name}</h2>
        <p className="f1-font">{circuit.country}</p>
        <p className="f1-font">Schedule: {schedule} circuit race</p>
      </div>
    </div>
  );
};

export default CircuitCard;
