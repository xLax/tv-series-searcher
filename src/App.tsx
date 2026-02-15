
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import SeriesDetails from './pages/SeriesDetails';
import './App.css';
import PageContextProvider from './store/page-context';

const queryClient = new QueryClient();

function App() {
  return (
    <PageContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/series/:id" element={<SeriesDetails />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </PageContextProvider>
  );
}

export default App;
