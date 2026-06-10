import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { LanguageProvider } from "./i18n/context";
import { Navigation } from "./components/Navigation";
import { ScrollToTop } from "./components/ScrollToTop";
import { PageTransition } from "./components/PageTransition";
import Home from "./pages/Home";
import About from "./pages/About";
import DataMarket from "./pages/DataMarket";
import TaskMarket from "./pages/TaskMarket";
import ReviewTasks from "./pages/ReviewTasks";
import Ranking from "./pages/Ranking";
import Community from "./pages/Community";
import PublishData from "./pages/PublishData";
import PublishTask from "./pages/PublishTask";
import ModelService from "./pages/ModelService";
import Workspace from "./pages/Workspace";
import Profile from "./pages/Profile";
import FAQ from "./pages/FAQ";
import DatasetDetail from "./pages/DatasetDetail";
import TaskDetail from "./pages/TaskDetail";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";

function AppRoutes() {
  const location = useLocation();

  // 页面切换时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/data-market"
          element={
            <PageTransition>
              <DataMarket />
            </PageTransition>
          }
        />
        <Route
          path="/model-service"
          element={
            <PageTransition>
              <ModelService />
            </PageTransition>
          }
        />
        <Route
          path="/task-market"
          element={
            <PageTransition>
              <TaskMarket />
            </PageTransition>
          }
        />
        <Route
          path="/review-tasks"
          element={
            <PageTransition>
              <ReviewTasks />
            </PageTransition>
          }
        />
        <Route
          path="/ranking"
          element={
            <PageTransition>
              <Ranking />
            </PageTransition>
          }
        />
        <Route
          path="/community"
          element={
            <PageTransition>
              <Community />
            </PageTransition>
          }
        />
        <Route
          path="/publish-data"
          element={
            <PageTransition>
              <PublishData />
            </PageTransition>
          }
        />
        <Route
          path="/publish-task"
          element={
            <PageTransition>
              <PublishTask />
            </PageTransition>
          }
        />
        <Route
          path="/workspace"
          element={
            <PageTransition>
              <Workspace />
            </PageTransition>
          }
        />
        <Route
          path="/profile"
          element={
            <PageTransition>
              <Profile />
            </PageTransition>
          }
        />
        <Route
          path="/faq"
          element={
            <PageTransition>
              <FAQ />
            </PageTransition>
          }
        />
        <Route
          path="/task/:id"
          element={
            <PageTransition>
              <TaskDetail />
            </PageTransition>
          }
        />
        <Route
          path="/dataset/:id"
          element={
            <PageTransition>
              <DatasetDetail />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased flex flex-col">
          <Navigation />
          <div className="flex-1 flex flex-col relative">
            <AppRoutes />
          </div>
          <ScrollToTop />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
