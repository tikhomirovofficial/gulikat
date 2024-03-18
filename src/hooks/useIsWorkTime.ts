import React, { useMemo } from 'react';
import { createDefaultParams } from "../utils/datetime/getParamsTimePeriod";
import { getTimes } from "../utils/datetime/avaliableTimes";
import { isCurrentDateInRange } from "../utils/datetime/isCurrentDateInRange";
import { getTimeFromDate } from '../utils/datetime/timeFromDate';

type IsWorkTimeHookProps = {
    startTime: string,
    endTime: string,
    is_around_time?: boolean
}
type IsWorkTimeHook = {
    isCurrent: boolean
    orderTimes: string[]
}
const useIsWorkTime = (params: IsWorkTimeHookProps): IsWorkTimeHook => {

    const orderTimesParams = useMemo(() => {
        //console.log(params.is_around_time);
        
        if (params.is_around_time) {
            const date = new Date()
            const tommorow = new Date()
            tommorow.setDate(date.getDate() + 1)
            tommorow.setHours(date.getHours() - 1)
            date.setMinutes(0)
            const currentTime = getTimeFromDate(date)
            const aroundEndTime = getTimeFromDate(tommorow)
            return createDefaultParams(currentTime, aroundEndTime, true)
        }
        
        return createDefaultParams(params.startTime, params.endTime)

    }, [params])


    const orderTimes = useMemo(() => getTimes(orderTimesParams), [orderTimesParams])
    const currentTimeIsWorkTime = useMemo(() => !params.is_around_time ? isCurrentDateInRange(orderTimesParams.startDate, orderTimesParams.endDate) : true, [params])
    console.log(currentTimeIsWorkTime);
    

    return {
        isCurrent: currentTimeIsWorkTime,
        orderTimes
    }
};

export default useIsWorkTime;