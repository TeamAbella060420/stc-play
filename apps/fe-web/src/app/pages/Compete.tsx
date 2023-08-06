import { IMAGES } from '@fe-monorepo/assets';
import Container from '../components/Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Compete = () => {
  return (
    <Container className="bg-primary mt-5">
      <LazyLoadImage src={IMAGES.Compete.toString()} className="object-fill w-full h-full" />
    </Container>
  );
};

export default Compete;
