import {Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import ScheduledMessages from './components/ScheduledMessages';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/scheduled-messages" element={<ScheduledMessages />} />
      </Routes>
    </>
  );
}

export default App;
