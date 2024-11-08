import './app.css'
import CertChoice from './routes/CertChoice';
import Form from './routes/Form';
import Success from './routes/Success';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<CertChoice />} />
        <Route path="/form" element={<Form />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </main>
  )
}

export default App
