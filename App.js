import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import AuctionItems from './AuctionItems';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/auction-items" element={<AuctionItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
