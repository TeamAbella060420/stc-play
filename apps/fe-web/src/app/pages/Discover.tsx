import Container from '../components/Container';
import { IMAGES } from '@fe-monorepo/assets';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Discover = () => {
    return (
      <Container className='bg-primary mt-6'>
        <LazyLoadImage
          src={IMAGES.Discover.toString()}
          className='object-fill w-full h-full'
        />
      </Container>
    );
}
 
export default Discover;