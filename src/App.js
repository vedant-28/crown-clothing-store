import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navbar from "./routes/navbar/navbar.component";

const Shop = () => {
  return <h1>Shop component</h1>
};

// <Routes /> => Lists routes that we can leverage
// <Route /> => Specific route, when "path" of URL string is mathed, renders whatever is passed in "element"
// "index" attribute => default true, when passed; that component will be matched with parent's "path" by default & rendered
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar/>}>
        <Route index element={<Home/>} /> {/*Both <Navbar/> & <Home/> will be rendered along with "/"*/}
        <Route path="shop" element={<Shop/>} />
      </Route>
    </Routes>
  );
};

export default App;
