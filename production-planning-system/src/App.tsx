import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/home-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import PackagingPage from './pages/packaging-page/packaging-page';
import PackagingCurrentOrdersComponent from './components/packaging-components/current-orders-component/current-orders-component';
import PackagingCompletedOrdersComponent from './components/packaging-components/completed-orders-component/completed-orders-component';
import Navigation from './components/navigation-component/navigation-component';
import { NavItem } from './utils/constants/constants';
import { ChakraProvider } from '@chakra-ui/react';


const App: React.FC = () => {
  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Packaging', path: '/packaging' },
  ];


  return (    
    <ChakraProvider>   
      <BrowserRouter>
        <Navigation items={navItems} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/packaging' element={<PackagingPage />}>
            <Route path='current-orders' element={<PackagingCurrentOrdersComponent />} />
            <Route path='completed-orders' element={<PackagingCompletedOrdersComponent />} />          
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
