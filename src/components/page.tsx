import React, { useState, createContext, useContext } from "react";
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
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

type BreadcrumbType = {
    label: string;
    href?: string | null;
}

const PageContext = createContext<{
    modal: boolean,
    sheet: boolean,
    // @ts-ignore
}>({});



export function Page({children, modal = false, size = 'sm', validateClose}: {children: React.ReactNode, modal?: boolean, size?: 'sm' | 'md' | 'lg' |'xl', validateClose?: () => boolean}) {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const attemptClose = (open: boolean) => {
        if(!open) {
            if(!validateClose || validateClose()) {
                setOpen(false);
                setTimeout(() => {
                    navigate(-1);
                }, 100);
            }
        }
    }

    if (location.state?.background) {

        let content = <></>;

        if(modal) {
            content = <Dialog open={open} onOpenChange={attemptClose}>
                    <DialogContent size={size}>
                        {children}
                    </DialogContent>
                </Dialog>;
        } else {
            const sheetSizes: any = {
                sm: 'md:max-w-xl! max-w-full!',
                md: 'md:max-w-3xl! max-w-full!',
                lg: 'xl:max-w-5xl! lg:max-w-3xl! max-w-full!',
                xl: 'xl:max-w-7xl! lg:max-w-5xl! max-w-full!'
            };
            
            content = <Sheet open={open} onOpenChange={attemptClose}>
                    <SheetContent className={cn("min-w-80 m-2 rounded-lg flex flex-col h-[calc(100dvh-1rem)] border w-full! px-4 overflow-y-auto", sheetSizes[size])}>
                        {children}
                    </SheetContent>
                </Sheet>;
        }

        return <PageContext.Provider
              value={{
                sheet: !modal,
                modal,
              } as any}
            >
                {content}
            </PageContext.Provider>
    }

    return <PageContext.Provider
              value={{
                sheet: false,
                modal: false,
              } as any}
            >{children}</PageContext.Provider>;
}

export function PageBreadcrumbs({breadcrumbs = []}: { breadcrumbs?: BreadcrumbType[] }) {
    const location = useLocation();

    if (location.state?.background) {
        return null;
    }

    return (
        <header className="flex mt-4 shrink-0 items-center">
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
    const {modal} = useContext(PageContext);

    if (location.state?.background) {
        if(modal) {
            return <DialogHeader className={className}>{children}</DialogHeader>;
        }

        return <SheetHeader className={cn('-mx-4', className)}>{children}</SheetHeader>;
    }

    return (
        <div className={clsx("mt-4 mx-2 sm:mx-5 space-y-1", className)}>
            {children}
        </div>
    );
}

export function PageTitle({children, className}: { children: React.ReactNode, className?: string }) {
    const location = useLocation();
    const {modal} = useContext(PageContext);

    if (location.state?.background) {
        if(modal) {
            return <DialogTitle className={className}>{children}</DialogTitle>;
        }
        return <SheetTitle className={className}>{children}</SheetTitle>;
    }

    return (
        <h1 className={clsx("text-xl font-medium text-balance", className)}>{children}</h1>
    );
}

export function PageDescription({children, className}: { children: React.ReactNode, className?: string }) {
    const location = useLocation();
    const {modal} = useContext(PageContext);

    if (location.state?.background) {
        if(modal) {
            return <DialogDescription className={className}>{children}</DialogDescription>;    
        }
        return <SheetDescription className={className}>{children}</SheetDescription>;
    }

    return (
        <p className={clsx("text-muted-foreground", className)}>{children}</p>
    );
}

export function PageContent({children, className}: { children: React.ReactNode, className?: string }) {
    const location = useLocation();

    return (
        <div className={clsx("@container grow w-full", className, {
            'px-2 pb-16 sm:px-5 md:pb-0 mt-4': !location.state?.background,
        })}>
            {children}
        </div>
    );
}