import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import Layout from "./components/layout";
import Challenges from "./components/dashboard/Challenges";
import Blogs from "./components/blog/Blogs";

// Lazy load routes for better performance
const TopicGrid = lazy(() => import("./components/dashboard/TopicGrid"));
const LearningProgress = lazy(
  () => import("./components/dashboard/LearningProgress"),
);
const TopicDetail = lazy(() => import("./components/dashboard/TopicDetail"));
const CodeEditor = lazy(() => import("./components/dashboard/CodeEditor"));
const Leaderboard = lazy(() => import("./components/dashboard/Leaderboard"));
const Bookmarks = lazy(() => import("./components/dashboard/Bookmarks"));

// Admin routes
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AddQuestionForm = lazy(
  () => import("./components/admin/AddQuestionForm"),
);

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/topics"
            element={
              <Layout>
                <TopicGrid />
              </Layout>
            }
          />
          <Route path="/topic/:id" element={<TopicDetail />} />
          <Route path="/problem/:id" element={<CodeEditor />} />
          <Route
            path="/progress"
            element={
              <Layout>
                <LearningProgress />
              </Layout>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <Layout>
                <Suspense
                  fallback={<div className="p-6">Loading bookmarks...</div>}
                >
                  <Bookmarks />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <Layout>
                <Suspense
                  fallback={<div className="p-6">Loading leaderboard...</div>}
                >
                  <Leaderboard />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/challenges"
            element={
              <Layout>
                <Suspense
                  fallback={<div className="p-6">Loading challenges...</div>}
                >
                  <Challenges />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/blogs"
            element={
              <Layout>
                <Suspense
                  fallback={<div className="p-6">Loading blogs...</div>}
                >
                  <Blogs />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/careers"
            element={
              <Layout>
                <div className="p-6">Careers coming soon</div>
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <div className="p-6">Settings coming soon</div>
              </Layout>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <Suspense
                fallback={<div className="p-6">Loading admin panel...</div>}
              >
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </Suspense>
            }
          />
          <Route
            path="/admin/questions/add"
            element={
              <Suspense
                fallback={<div className="p-6">Loading question form...</div>}
              >
                <AdminLayout>
                  <AddQuestionForm />
                </AdminLayout>
              </Suspense>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
