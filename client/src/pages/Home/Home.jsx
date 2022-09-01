import './Home.scss';

import { Header, Menu, CardContainer } from '../../components';

function Home() {
  return (
    <div className="home">
      <Header />
      <Menu />
      <CardContainer />
    </div>
  );
}

export default Home;
