import './Home.scss';

import { FilterMenu, SortMenu, CardContainer,  } from '../../components';

const Home = () => {
  return (
    <div className="home-page">
      <FilterMenu />
      <SortMenu />
      <CardContainer />
    </div>
  )
}

export default Home;