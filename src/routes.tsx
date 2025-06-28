import { PropertyCalendar } from "@/routes/pms/properties/calendar/property-calendar.tsx";
import UpdatePropertyCalendar from "@/routes/pms/properties/calendar/update-property-calendar";
import { Dashboard } from "./routes/dashboard";
import { Home } from "@/routes/index";
import PropertiesList from "@/routes/pms/properties";

export type LocalRoute = {
    element: any,
    path: string,
};

const routes: LocalRoute[] = [
    {path: '/', element: <Home />},

    // PMS
    {path: '/pms/properties', element: <PropertiesList />},


    // @todo: remove
    {path: '/dashboard', element: <Dashboard />},
    {path: '/calendar/:id', element: <PropertyCalendar />},
    {path: '/calendar-update/:id/:start?/:end?', element: <UpdatePropertyCalendar />},
];

export default routes;
