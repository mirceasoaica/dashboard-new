import {
    Page,
    PageBreadcrumbs,
    PageContent,
    PageDescription,
    PageHeader,
    PageTitle
} from "@/components/page.tsx";
import {DemoVerticalBarChart} from "@/app/demo/charts/vertical-bar-chart.tsx";
import {DemoPieChart} from "@/app/demo/charts/pie-chart.tsx";
import {DemoHorizontalBarChart} from "@/app/demo/charts/horizontal-bar-chart.tsx";
import {DemoLineChart} from "@/app/demo/charts/line-chart.tsx";
import {DemoRadialChart} from "@/app/demo/charts/radial-chart.tsx";
import Link from "@/components/application/link.tsx";

function Dashboard() {

    return (<Page size="lg">
        <PageBreadcrumbs breadcrumbs={[
            {label: 'Home', href: '/'},
            {label: 'Dashboard', href: '/demo'},
            {label: 'Page'}
        ]} />

        <PageHeader>
            <PageTitle>Dashboard</PageTitle>
            <PageDescription>
                Welcome to the dashboard. This is a demo page.
            </PageDescription>
        </PageHeader>

        <PageContent>
            <div className={'mt-4 grid grid-cols-1 @3xl:grid-cols-2 @5xl:grid-cols-3 gap-6 pb-4'}>
                <DemoVerticalBarChart/>
                <DemoPieChart/>
                <DemoHorizontalBarChart/>
                <DemoLineChart/>
                <DemoRadialChart/>

                <Link modal to={'/pms/properties'}>Open calendar</Link>
            </div>
        </PageContent>
    </Page>);
}

export { Dashboard }