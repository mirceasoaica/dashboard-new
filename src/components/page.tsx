import React, {useEffect} from "react";
import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {clsx} from "clsx";
import {SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import { Link, useLocation } from "@tanstack/react-router";

type BreadcrumbType = {
    label: string;
    href?: string | null;
}

export function PageBreadcrumbs({breadcrumbs = []}: { breadcrumbs?: BreadcrumbType[] }) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 mx-2 sm:mx-5 grow">
                <SidebarTrigger className="-ml-1"/>
                {breadcrumbs.length > 0 ? (
                    <>
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map(({label, href}, index) => (<React.Fragment key={index}>
                                        <BreadcrumbItem>
                                            {href ? (
                                                <BreadcrumbLink asChild={true}>
                                                    <Link to={href}>{label}</Link>
                                                </BreadcrumbLink>
                                            ) : (
                                                <BreadcrumbPage>{label}</BreadcrumbPage>
                                            )}
                                        </BreadcrumbItem>
                                        {index < breadcrumbs.length - 1 ? (
                                            <BreadcrumbSeparator/>
                                        ) : null}
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </>
                ) : null}
            </div>
        </header>
    );
}

export function PageHeader({children, className}: { children: React.ReactNode, className?: string }) {
    const location = useLocation();

    if (location.state?.background) {
        return <SheetHeader className={className}>{children}</SheetHeader>;
    }

    return (
        <div className={clsx("mb-4 mx-2 sm:mx-5 space-y-1", className)}>
            {children}
        </div>
    );
}

export function PageTitle({children, documentTitle, className}: { children: React.ReactNode, documentTitle: string, className?: string }) {
    const location = useLocation();

    useEffect(() => {
        const prevTitle = document.title;
        document.title = documentTitle;

        return () => {
            document.title = prevTitle || '';
        };
    });

    if (location.state?.background) {
        return <SheetTitle className={className}>{children}</SheetTitle>;
    }

    return (
        <h1 className={clsx("text-xl font-medium text-balance", className)}>{children}</h1>
    );
}

export function PageDescription({children, className}: { children: React.ReactNode, className?: string }) {
    const location = useLocation();

    if (location.state?.background) {
        return <SheetDescription className={className}>{children}</SheetDescription>;
    }

    return (
        <p className={clsx("text-muted-foreground", className)}>{children}</p>
    );
}

export function PageContent({children, className}: { children: React.ReactNode, className?: string }) {
    const location = useLocation();

    return (
        <div className={clsx("@container grow", {
            'px-2 pb-16 sm:px-5 md:pb-0': !location.state?.background,
        }, className)}>
            {children}
        </div>
    );
}