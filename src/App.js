import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import shallow from "zustand/shallow";
import Notification from "./Notification";
import { useUserStore } from "./store";
const FormTest = React.lazy(() => import("./FormTest"));
const TestPage = React.lazy(() => import("./TestPage"));

function App() {
  const [notifications, setNotifications, deleteNotification] = useUserStore(
    (state) => [state.notifications, state.setNotifications, state.deleteNotification],
    shallow
  );

  return (
    <BrowserRouter>
      <Notification data={notifications} deleteNotification={deleteNotification} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<FormTest setNotifications={setNotifications} />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/test:id" element={<TestPage />} />

          <Route path="/sub">
            <Route index={true} element={<h1>Test1</h1>} />
            <Route path="/sub/2" element={<h1>Test2</h1>} />
          </Route>

          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
