import { Navigate, Route, Routes } from "react-router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import SignUpPage from "./Pages/SignUpPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import OnboardingPage from "./Pages/OnboardingPage.jsx";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.jsx";
import EmailVerification from "./components/EmailVerification.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.jsx";
import HomePage from "./Pages/HomePage.jsx";
import NotificationPage from "./Pages/NotificationPage.jsx";
import FriendsPage from "./Pages/FriendsPage.jsx";
import UpdateProfilePage from "./Pages/UpdateProfilePage.jsx";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  // Force a dark theme for now or ensure the stored theme is valid
  // This is a quick check, ideally we use the store 
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const isAuthenticated = authUser?.isVerified;
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen">
      <Routes>
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? <OnboardingPage /> : <Navigate to="/" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/update-profile"
          element={
            isAuthenticated && isOnboarded ? (
              <UpdateProfilePage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar>
                <NotificationPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/friends"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showNavbar={false}>
                <FriendsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
