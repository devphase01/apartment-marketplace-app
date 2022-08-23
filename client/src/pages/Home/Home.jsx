import './Home.scss';

import { Header, SortMenu, CardContainer,  } from '../../components';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <SortMenu />
      <CardContainer />
    </div>
  )
}

export default Home;