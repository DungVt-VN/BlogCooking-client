import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouteConfig from './RouteConfig';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import useAuth from '../hooks/useAuth';
import NotFound from '../pages/NotFound';
import Navbar from '../components/Navbar';
import Footer from '../layout/Footer';

const Routing = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div id='root' className='bg-slate-400/50 overflow-auto'>
        <Navbar />
        <Routes>
          {RouteConfig.map((route, index) => {
            const RouteElement = route.component; // Lấy component

            if (route.isPrivate) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<PrivateRoute allowedRoles={route.allowedRoles}>{RouteElement}</PrivateRoute>}
                />
              );
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={<PublicRoute>{RouteElement}</PublicRoute>}
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Routing;
