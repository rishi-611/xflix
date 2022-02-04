import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerComponent = () => {
  return (
    <div className="container spinner-container text-center bg-dark text-light">
      <Spinner animation="border" variant="primary" size="lg" />
    </div>
  );
};

export default SpinnerComponent;
