import { render, waitFor, screen } from "@testing-library/react"
import Dashboard from "../layout/Dashboard";
import store from '../app/store';
import { Provider } from 'react-redux';
import TopSection from "../components/TopSection";


test("renders a top secction, check if the title is correct", async () => {
    render(<Provider store={store}> <TopSection itemName={"In Use"} itemValue={123}/> </Provider>);
    expect(screen.getByText("In Use"))
  });

  test("renders a top secction, check if the number is correct", async () => {
    render(<Provider store={store}> <TopSection itemName={"In Use"} itemValue={123}/> </Provider>);
    expect(screen.getByText(123))
  });