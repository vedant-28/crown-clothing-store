import CategoryDirectory from '../.././components/category-directory/category-directory.component';
//import { Outlet } from 'react-router-dom';

const Home = () => {
  const categories = [
    {
      "id": 1,
      "title": "Hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      "id": 2,
      "title": "Jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      "id": 3,
      "title": "Sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "id": 4,
      "title": "Womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
    },
    {
      "id": 5,
      "title": "Mens",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
    }
  ];
  // "Outlet" renders nested matching "Route" wherever it is called.
  // Here, "Outlet" will render "Shop" before CategoryDirectory.
  return (
    <div>
      {/* <Outlet /> Wherever this "Outlet" is rendered, there then path will be matched from nested child component */}
      <CategoryDirectory categories={categories}/>
    </div>
  );
};

export default Home;
