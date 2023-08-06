import { useState } from 'react';
import Container from '../../../../components/Container';
import SectionHeader from '../../Components/SectionHeader';
import SeeAll from '../../Components/SeeAll';
import { translate } from '@fe-monorepo/helper';

import Tournaments from './Components/Tournaments';

enum competeKeys { tournaments = "tournaments",  matchmaking = "matchmaking"}

const CompeteSection = () =>
{
    const tabs: { id: competeKeys, label: string }[]  =
    [
      {
        id: competeKeys.tournaments,
        label: (""+translate("tabTitle_tournaments")).toLocaleLowerCase()
      },
      {
        id: competeKeys.matchmaking,
        label: (""+translate("tabTitle_matchmaking")).toLocaleLowerCase()
      }
    ];

    const [activeTab, setActiveTab] = useState<number>(0);

    const SubSections: {[section in competeKeys]: JSX.Element } =
    {
      tournaments: <Tournaments />,
      matchmaking: <></>
    }

    return (
      <section className='my-40 4xl:my-72 5xl:my-100 8xl:my-203'>
        <Container className='bg-primary'>
          <SectionHeader
            className='h-full w-full mb-40 4xl:mb-72 5xl:mb-100 8xl:mb-203'
            title={""+translate("home_compete")}
            tabs={tabs}
            activeTab={activeTab}
            selectTab={(index: number) => setActiveTab(index)}
          />
        </Container>

        {SubSections[tabs[activeTab].id]}

        <Container className='bg-primary'>
          <SeeAll className="mt-24 mb-40"/>
        </Container>
      </section>
    );
}

export default CompeteSection;
