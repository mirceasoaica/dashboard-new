import { Skeleton } from "@/components/ui/skeleton"

export default function AppLoader() {
    // Function to generate random width percentage between 60% and 100%
    const randomWidth = () => `${Math.floor(Math.random() * (100 - 60 + 1) + 60)}%`

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar - hidden on mobile */}
            <div className="hidden w-64 shrink-0 md:block border-r border-border">
                <div className="flex h-full flex-col p-4">
                    {/* Search input skeleton */}
                    <div className="mb-6">
                        <img src={'/logo.svg'} alt="Logo" className="h-8 w-auto" />
                    </div>

                    <Skeleton className="h-[40px] w-full rounded-lg"/>

                    {/* Sidebar navigation items */}
                    <div className="flex-1 space-y-3 mt-6">
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={`nav-item-${i}`} className="h-5 rounded-md" style={{ width: randomWidth() }} />
                        ))}
                    </div>

                    {/* User profile skeleton */}
                    <div className="mt-auto pt-6 border-t border-border">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[120px]" />
                                <Skeleton className="h-3 w-[80px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                {/* Content */}
                <main className=" p-4 md:p-6">
                    <div className="grid gap-4 md:gap-6 max-w-5xl mx-auto">
                        <Skeleton className="h-[35px] rounded-lg w-48"/>

                        <div className="col-span-full grid gap-4 sm:grid-cols-2">
                            <Skeleton className="h-[100px] rounded-lg"/>
                            <Skeleton className="h-[100px] rounded-lg"/>
                        </div>

                        <div className="col-span-full grid gap-4 sm:grid-cols-3">
                            <Skeleton className="h-[200px] rounded-lg"/>
                            <Skeleton className="h-[200px] rounded-lg"/>
                            <Skeleton className="h-[200px] rounded-lg"/>
                        </div>

                        <div className="col-span-full">
                            <Skeleton className="h-[300px] w-full rounded-lg"/>
                        </div>

                    </div>
                </main>

                <div className={'text-sm text-center mb-2'}>
                    Powered by RentalWise.
                </div>
            </div>
        </div>
    )
}