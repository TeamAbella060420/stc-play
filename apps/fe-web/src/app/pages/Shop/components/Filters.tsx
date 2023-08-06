import Pills from '../../../components/Pills';

interface FilterProps {
  id: number;
  name: string;
  sort_id: number;
}
interface ShopFilters {
  filters?: FilterProps[];
  defaultText?: string;
  onClick?: ({}: { id: number; name: string }) => void;
  activeFilter?: string;
}

const ShopFilters: React.FC<ShopFilters> = ({ filters = [], defaultText, onClick = () => {}, activeFilter }) => {
  return (
    <div className='flex w-full h-full gap-5 4xl:gap-[35.55px] 8xl:gap-[106px] overflow-x-scroll'>
      {filters.length > 0 &&
        filters
          .map(({ id, name }) => (
            <Pills
              text={name}
              key={id}
              className={`cursor-pointer ${
                activeFilter === name ? 'bg-sunset text-white transition-all ease-in-out duration-300' : ''
              }
              rounded
              4xl:text-[24.88px]
              4xl:h-[49.77px]
              4xl:px-[21.33px]
              8xl:text-[74.66px]
              8xl:h-[149.33px]
              8xl:py-[5.33px]
              8xl:px-[64px]
              `}
              onClick={() => onClick({ id, name })}
            />
          ))}
      {filters.length === 0 && (
        <div className='flex gap-5 4xl:gap-[35px] 8xl:gap-[106.66px] pb-10'>
          <div className='bg-gray-200/5 w-[100px] 4xl:w-[177px] 8xl:w-[533px] animate-pulse h-[28px] 4xl:h-[49.77px] 8xl:h-[149.33px] rounded' />
          <div className='bg-gray-200/5 w-[100px] 4xl:w-[177px] 8xl:w-[533px] animate-pulse h-[28px] 4xl:h-[49.77px] 8xl:h-[149.33px] rounded' />
          <div className='bg-gray-200/5 w-[100px] 4xl:w-[177px] 8xl:w-[533px] animate-pulse h-[28px] 4xl:h-[49.77px] 8xl:h-[149.33px] rounded' />
        </div>
      )}
    </div>
  );
};

export default ShopFilters;
