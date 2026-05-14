import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Preloader from "components/shared/Preloader";
import CacheBuster from "components/CacheBuster";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartContextProvider } from "contexts/CartContext";
import { UserContextProvider } from "contexts/UserContext";
import { GamesContextProvider } from "contexts/GamesContext";
import { SidebarContextProvider } from "contexts/SidebarContext";
import { BundleCoursesContextProvider } from "contexts/BundleCoursesContext";
import { ActiveCoursesContextProvider } from "contexts/ActiveCoursesContext";

import { postRequest } from "utils/api";
import { isLoggedIn } from "utils/helper";

import "./Over-Write.css";
import "react-dropdown/style.css";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import AppRouter from "routes/index";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  function refreshToken() {
    if (!isLoggedIn()) {
      setIsLoading(false);
      return;
    }

    let currEpoch = Math.floor(Date.now() / 1000);
    let expEpoch = parseInt(localStorage.getItem("exp"));

    if (expEpoch - currEpoch > 120) return setIsLoading(false);

    let token = localStorage.getItem("authToken");
    postRequest("/auth/token", { token })
      .then((res) => {
        let decoded = jwt_decode(res.data.token);
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("exp", decoded.exp);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(err) => console.log(err)}
      onReset={() => window.location.reload()}
    >
      <CacheBuster>
        {({ loading, isLatestVersion, refreshCacheAndReload }) => {
          if (loading) return null;
          if (!loading && !isLatestVersion) {
            refreshCacheAndReload();
          }
          return isLoading ? (
            <Preloader />
          ) : (
            <BundleCoursesContextProvider>
              <ActiveCoursesContextProvider>
                <SidebarContextProvider>
                  <CartContextProvider>
                    <GamesContextProvider>
                      <UserContextProvider>
                        <ToastContainer
                          position="top-right"
                          autoClose={3000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          rtl={false}
                          closeOnClick
                          pauseOnFocusLoss
                          pauseOnHover
                        />
                        <Router>
                          <AppRouter />
                        </Router>
                      </UserContextProvider>
                    </GamesContextProvider>
                  </CartContextProvider>
                </SidebarContextProvider>
              </ActiveCoursesContextProvider>
            </BundleCoursesContextProvider>
          );
        }}
      </CacheBuster>
    </ErrorBoundary>
  );
};

export default App;
