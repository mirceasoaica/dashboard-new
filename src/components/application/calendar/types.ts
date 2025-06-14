export type CalendarDayInfo = {
    date: string;
} & any;

export type CalendarEventInfo = {
    id: number | string;
    start: Date;
    end: Date;
    overlappingEvents?: CalendarEventInfo[];
    calendarPosition?: number;
} & any;

export type CalendarResource = {
    id: number | string;
} & any;

export type CalendarDate = {
    date: Date;
    formattedDate: string;
    isPast: boolean;
    isToday: boolean;
    isWeekend: boolean;
};

export type CalendarMissingData = {
    resources: any[];
    start: string;
    end: string;
};

export type CalendarResourceDayData = {
    id: number | string;
    dayData: CalendarDayInfo[];
    eventData?: CalendarEventInfo[];
}