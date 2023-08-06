import { useDynamicTextState } from '../../../lib/hooks/useDynamicTextState/useDynamicTexState';
import TypeWriter from '../../components/TypeWriter';

const DynamicTextComponent = () => {
  const { pauseSpeed, t, prefs, isHighlighted } = useDynamicTextState();

  const words = [t('common_gaming'), t('common_competition'), t('common_connecting'), t('common_shop')];
  return (
    <div className="py-64 sm:py-120 5xl:py-203 8xl:py-490 z-[1]">
      <p className="block  break-keep text-mobileDynamic xl:text-xlargeDynamic 5xl:text-fiveKDynamic 8xl:text-eightKDynamic lg:tracking-[-1px] font-medium">
        <p className="text-white100 ">{t('common_exploreMsg')}</p>

        <span className="text-white100 ">
          {t('common_realmMsg')}{' '}
          <span className={`line-clamp-2 w-fit sm:line-clamp-none sm:inline text-sunset ${isHighlighted && 'bg-sunset/[0.3]'}`}>
            <TypeWriter
              key={prefs.language}
              wordStyle=""
              words={words}
              writeSpeed={75}
              highlightOptions={{
                shouldHighlight: true,
                style: 'bg-[#E95F2A]/[0.5]',
                delay: pauseSpeed
              }}
            />
          </span>
        </span>
      </p>
    </div>
  );
};

export default DynamicTextComponent;
