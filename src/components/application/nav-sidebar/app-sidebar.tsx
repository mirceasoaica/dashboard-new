import {
    HelpCircle, Home,
    Settings2,
} from "lucide-react"

import {NavMain} from "@/components/application/nav-sidebar/nav-main.tsx"
import {NavUser} from "@/components/application/nav-sidebar/nav-user.tsx"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter, SidebarGroup, SidebarGroupContent,
    SidebarHeader,
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem, SidebarSeparator,
} from "@/components/ui/sidebar.tsx"
import { Link } from "react-router-dom"

export function AppSidebar() {
    return (<>
            <Sidebar variant="inset">
                <SidebarHeader className={'mt-2'}>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <img src={'/icon.svg'} alt="Logo" className="w-9"/>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <NavMain/>
                    <SidebarGroup className={'mt-auto'}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link to={''}>
                                            <Settings2 className={'size-5!'}/>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link to={''}>
                                            <HelpCircle className={'size-5!'}/>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarSeparator/>
                    <NavUser/>
                </SidebarFooter>
            </Sidebar>

            {/*Mobil menu*/}
            <div className={'md:hidden fixed bottom-2 inset-x-0 flex justify-center h-12'}>
                <div className={'rounded-full flex bg-foreground text-background items-center space-x-3 px-3'}>
                    <div className={'p-1.5 rounded-full bg-accent/20'}>
                        <Home className={'size-7 text-background'}/>
                    </div>

                    <div className={'p-1.5 rounded-full'}>
                        <Home className={'size-7 text-background'}/>
                    </div>

                    <div className={'p-1 rounded-full'}>
                        <Home className={'size-7 text-background'}/>
                    </div>
                </div>
            </div>
        </>
    )
}
