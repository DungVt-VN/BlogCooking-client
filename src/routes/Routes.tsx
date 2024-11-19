import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteConfig from "./RouteConfig";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import useAuth from "../hooks/useAuth";
import NotFound from "../pages/NotFound";
import Navbar from "../components/Navbar";

const Routing = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div id="root" className="bg-dark overflow-auto">
        <Navbar />
        <section className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700/20 min-h-screen text-black">
          <Routes>
            {RouteConfig.map((route, index) => {
              const RouteElement = route.component; // Lấy component

              if (route.isPrivate) {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <PrivateRoute allowedRoles={route.allowedRoles}>
                        {RouteElement}
                      </PrivateRoute>
                    }
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
          {/* <Footer /> */}
        </section>
      </div>
    </BrowserRouter>
  );
};

export default Routing;
