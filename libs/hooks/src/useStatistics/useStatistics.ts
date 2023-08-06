import { useLazyQuery } from "@apollo/client";
import { STATISTICS_QUERY } from "@fe-monorepo/data-access";
import { useEffect, useState } from "react";
import { useAppState } from "../useAppState/useAppState";


type StatistecsData = 
{
    active_tournaments: number,
    active_participants: number,
    active_prizes: number
}

export const useStatistics = ()=>
{
    const [getAllTournamentStatistecs, { data: statistics, error: statisticsError }] = useLazyQuery(STATISTICS_QUERY.getAllTournamentStatistecs, { errorPolicy: 'all' });

    const { changeLoadingState } = useAppState();
    const [ statisticsData, setStatisticsData] = useState<StatistecsData>();

    const getStatistecsData = async ()=>
    {
        changeLoadingState(true)
        getAllTournamentStatistecs();
    }

    useEffect(() => {
        if (statistics) 
        {
          const data = statistics?.getAllTournamentStatistecs?.data;
          changeLoadingState(false);
          setStatisticsData(data)
        }
      }, [statistics]);

      return {  getAllTournamentStatistecs, statisticsData }
}