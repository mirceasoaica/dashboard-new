import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/application/nav-sidebar/app-sidebar.tsx";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className={'border border-neutral-200 shadow-2xl'}>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}