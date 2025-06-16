import { PropertyCalendar } from "./routes/calendar/$propertyId";
import UpdatePropertyCalendar from "./routes/calendar/update-property-calendar";
import { Dashboard } from "./routes/dashboard";
import { Home } from "./routes/index";

export type LocalRoute = {
    element: any,
    path: string,
};

const routes: LocalRoute[] = [
    {path: '/', element: <Home />},
    {path: '/dashboard', element: <Dashboard />},
    {path: '/calendar/:id', element: <PropertyCalendar />},
    {path: '/calendar-update/:id/:start?/:end?', element: <UpdatePropertyCalendar />},
];

export default routes;
