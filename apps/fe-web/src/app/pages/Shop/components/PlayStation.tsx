import { useState } from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import { IMAGES } from '@fe-monorepo/assets';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';

const PlayStation = () => {
  const { themes } = useSelector((state: RootState) => state.app);
  const [isOpen, setIsOpen] = useState(false);
  const { Gadgets, Crown } = IMAGES;
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10, transition: { delay: 0.7 } }}
        transition={{ duration: 0.5 }}
        className="absolute top-5 mt-100 inset-x-0 bottom-0 bg-primary p-2 z-50"
        onClick={toggleDropdown}
      >
        <Container className="flex w-1440 h-full items-start">
          <div className="flex w-588 items-center flex-shrink-0 self-stretch">
            <div className="flex flex-col items-start gap-24 flex-1">
              <div className='flex justify-center items-center gap-5'>
                <Button text="Console" className="text-2xl text-secondary" />
                <span className="w-20 h-20 transform rotate-30 flex-shrink-0 text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none" className="text-secondary">
                    <path
                      d="M9.42804 10.2853L9.42804 11.947L16.01 11.9529L8.83879 19.1242L10.0173 20.3027L17.1885 13.1314L17.1826 19.7134H18.8561V10.2853H9.42804Z"
                      fill="#9199A0"
                      fill-opacity="0.42"
                    />
                  </svg>
                </span>
              </div>
              <div className='flex justify-center items-center gap-5'>
                <Button text="Accessories" className="text-2xl text-secondary" />
                <span className="w-20 h-20 transform rotate-30 flex-shrink-0 text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none" className="text-secondary">
                    <path
                      d="M9.42804 10.2853L9.42804 11.947L16.01 11.9529L8.83879 19.1242L10.0173 20.3027L17.1885 13.1314L17.1826 19.7134H18.8561V10.2853H9.42804Z"
                      fill="#9199A0"
                      fill-opacity="0.42"
                    />
                  </svg>
                </span>
              </div>
              <div className='flex justify-center items-center gap-5'>
                <Button text="PSN" className="text-2xl text-secondary" />
                <span className="w-20 h-20 transform rotate-30 flex-shrink-0 text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none" className="text-secondary">
                    <path
                      d="M9.42804 10.2853L9.42804 11.947L16.01 11.9529L8.83879 19.1242L10.0173 20.3027L17.1885 13.1314L17.1826 19.7134H18.8561V10.2853H9.42804Z"
                      fill="#9199A0"
                      fill-opacity="0.42"
                    />
                  </svg>
                </span>
              </div>
              <div className='flex justify-center items-center gap-5'>
                <Button text="Software" className="text-2xl text-secondary" />
                <span className="w-20 h-20 transform rotate-30 flex-shrink-0 text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none" className="text-secondary">
                    <path
                      d="M9.42804 10.2853L9.42804 11.947L16.01 11.9529L8.83879 19.1242L10.0173 20.3027L17.1885 13.1314L17.1826 19.7134H18.8561V10.2853H9.42804Z"
                      fill="#9199A0"
                      fill-opacity="0.42"
                    />
                  </svg>
                </span>
              </div>
              <div className='flex justify-center items-center gap-5'>
                <Button text="VR" className="text-2xl text-secondary" />
                <span className="w-20 h-20 transform rotate-30 flex-shrink-0 text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none" className="text-secondary">
                    <path
                      d="M9.42804 10.2853L9.42804 11.947L16.01 11.9529L8.83879 19.1242L10.0173 20.3027L17.1885 13.1314L17.1826 19.7134H18.8561V10.2853H9.42804Z"
                      fill="#9199A0"
                      fill-opacity="0.42"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div
              className="flex h-280 p-24 items-start gap-10 flex-shrink-0"
              style={{ borderRadius: '4px', background: 'var(--brand-purple, #480986)' }}
            >
              <div className="d-flex">
                <div className="w-163">
                  <span className="font-STCForward text-base font-normal w-163 text-white">Playstation</span>
                </div>
                <div>
                  <span className="font-STCForward text-base font-bold text-white">Sign up and get the best for less</span>
                </div>
              </div>
              <div>
                <div className="w-189 h-189">
                  <LazyLoadImage src={Crown.toString()} />
                </div>
                <div>
                  <LazyLoadImage src={Gadgets.toString()} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </motion.div>
    </div>
  );
};

export default PlayStation;
