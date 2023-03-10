import React from "react";
import ReactDOM from "react-dom";
import DestinationHeader from "./../index";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import "@testing-library/jest-dom";

function wrapper(element) {
  return <Provider store={store}>{element}</Provider>;
}
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(wrapper(<DestinationHeader />), div);
});

it("renders destinationHeader correctly", () => {
  render(wrapper(<DestinationHeader />));
});

it("if the prop is passed, render the destination", () => {
  render(wrapper(<DestinationHeader destination="test building" />));
  expect(screen.getByText(/to reach test building/i)).toBeInTheDocument();
});
