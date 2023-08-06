import Shop from '../Shop';
import CompeteSection from '../Home/Sections/CompeteSection/CompeteSection';

// Spacing between sections should be 80 in FHD
const Home = () =>
{
  return (
    <main className=''>
      {/** Shop Section**/}
      <Shop/>

      <CompeteSection />
    </main>
  )
};

export default Home;
