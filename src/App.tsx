import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loadable from "react-loadable";

import MainLayout from "./layouts/MainLayout";

import Home from "./components/pages/Home";

import "./scss/app.scss";

// const Cart = React.lazy(
//   () => import(/* webpackChunkName: 'Cart' */ "./components/pages/Cart")
// );

const Cart = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'Cart' */ "./components/pages/Cart"),
  loading: () => <div>Loading...</div>,
});
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: 'FullPizza' */ "./components/FullPizza")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: 'NotFound' */ "./components/pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
