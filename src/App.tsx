import {
  // createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HeroesList } from "./components/heroes-list";
import "./App.css";
import { HeroPage } from "./components/hero-page";

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HeroesList />}></Route>
      <Route path="heroes/:heroId" element={<HeroPage />}></Route>
    </>
  )
);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
