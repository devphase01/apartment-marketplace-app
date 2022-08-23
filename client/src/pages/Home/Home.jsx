import './Home.scss';

import { Header, Menu, CardContainer,  } from '../../components';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Menu />
      <CardContainer />
    </div>
  )
}

export default Home;