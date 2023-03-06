import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store'
import PageHeader from './components/header';
import PageFooter from './components/footer';
import Announcement from './components/announcement';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <div className="flex flex-col h-fullToolBar justify-between">
          <PageHeader />
          <Announcement />
            <App/>
          <PageFooter />
        </div> 
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
