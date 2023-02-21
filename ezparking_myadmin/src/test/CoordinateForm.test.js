import { render, screen } from "@testing-library/react"
import CoordinateForm from "../components/CoordinateForm"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import store from '../app/store';


function renderWithContext(element) {
    render(
      <Provider store={store}>{element}</Provider>
   );
   return { store };
}

test('on initial render, the send data state is empty', () =>{
    // Use mock store with production logic to simulate real life enviorment
    const { store } = renderWithContext(<CoordinateForm />);
    expect(store.getState().mapClicked.sendData).toEqual({});
})

test('on initial render, the send graph button is disabled', () =>{
    render(
        <Provider store={store}>
            <CoordinateForm />
        </Provider>
        
    );
    expect(screen.getByRole('button', { name: /Send Graph/i})).toBeDisabled;
})

test('After user add a waypoint, the send data state is updated, send data button is ebabled', () =>{
    // Use mock store with production logic to simulate real life enviorment
    const mockStore = configureStore()

    render(
        <Provider store={mockStore({mapClicked: {sendData: 'mockData'}})}>
            <CoordinateForm />
        </Provider>
    );
    expect(screen.getByRole('button', { name: /Send Graph/i})).toBeEnabled;
})
