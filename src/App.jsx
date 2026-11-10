import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar score={ 0 } />
        </div>
        <div>

        </div>
      </BrowserRouter>
    </>
  );
}
