import {create} from "zustand";
import {eachDayOfInterval, format, isPast, isToday, isWeekend} from "date-fns";
import {YMD_FORMAT} from "@/lib/utils.ts";
import {
    CalendarDate,
    CalendarDayInfo,
    CalendarEventInfo,
} from "@/components/application/calendar/types.ts";

export type SingleCalendarStore = {
    daysData: {[key: number]: CalendarDayInfo},
    eventsData: CalendarEventInfo[],
    rowSizes: {[key: number]: number},
    dates: CalendarDate[],
    dateStringsToIndex: {[key: string]: number},
    datesSelection: {start: number, end: number} | null;

    startDateSelection: (dateIndex: number) => void;
    addDateSelection: (dateIndex: number) => void;
    clearDateSelection: () => void;

    addDaysAndEventData: (days: CalendarDayInfo[], events: CalendarEventInfo[]) => void;

    getDatesSelection: () => {start: Date, end: Date} | null;

    setDates: (start: Date, end: Date) => void;
};

const useSingleCalendarStore = create<SingleCalendarStore>((set, get) => ({
    daysData: {},
    eventsData: [],
    rowSizes: {},
    dates: [],
    dateStringsToIndex: {},

    datesSelection: null,



    setDates: (start, end) => {
        const dateStringsToIndex: {[key: string]: number} = {};

        const dates = eachDayOfInterval({start, end}).map((date: Date, index) => {
            const formatted = format(date, YMD_FORMAT);
            dateStringsToIndex[formatted] = index;
            return {
                date,
                formattedDate: formatted,
                isPast: isPast(date) && !isToday(date),
                isToday: isToday(date),
                isWeekend: isWeekend(date),
            };
        });

        set({
            dates,
            dateStringsToIndex,
        });
    },

    addDaysAndEventData: (days: CalendarDayInfo[], events: CalendarEventInfo[]) => {
        const {daysData, dateStringsToIndex, eventsData} = get();

        const newDayData: {[key: number]: CalendarDayInfo} = {
            ...daysData,
        };

        const newEventData: CalendarEventInfo[] = [
            ...eventsData,
        ];

        days.forEach((dayInfo: CalendarDayInfo) => {
            newDayData[dateStringsToIndex[dayInfo.date]] = dayInfo;
        });

        events.forEach((eventInfo: CalendarEventInfo) => {
            if(!eventsData.find((value) => value.id == eventInfo.id)) {
                newEventData.push(eventInfo);
            }
        });

        set(() => ({daysData: newDayData, eventsData: newEventData}));
    },

    startDateSelection: (dateIndex: number) => {
        set({
            datesSelection: {
                start: dateIndex,
                end: dateIndex,
            }
        });
    },

    addDateSelection: (dateIndex: number) => {
        const {datesSelection} = get();

        if(!datesSelection) {
            return ;
        }

        if(datesSelection.end < dateIndex || datesSelection.start < dateIndex) {
            datesSelection.end = dateIndex;
        } else {
            datesSelection.start = dateIndex;
        }

        set({
            datesSelection: {...datesSelection}
        });
    },

    clearDateSelection: () => {
        set({
            datesSelection: null
        });
    },

    getDatesSelection: () => {
        const {datesSelection, dates} = get();

        if(!datesSelection) {
            return null;
        }

        return {
            start: dates[datesSelection.start].date,
            end: dates[datesSelection.end].date,
        };
    },

}));

export default useSingleCalendarStore;