import {useLocation, useNavigate} from "react-router-dom";
import {Sheet, SheetContent} from "@/components/ui/sheet.tsx";
import {ReactNode, useState} from "react";
import {cn} from "@/lib/utils.ts";

export type NavSheetTypes = 'sm' | 'md' | 'lg' | 'xl';

export const NavigationSheet = ({children}: {children: ReactNode}) => {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const modalSizes: any = {
        sm: 'md:max-w-xl! max-w-full!',
        md: 'md:max-w-3xl! max-w-full!',
        lg: 'xl:max-w-5xl! lg:max-w-3xl! max-w-full!',
        xl: 'xl:max-w-7xl! lg:max-w-5xl! max-w-full!'
    };
    const background = typeof location.state?.modalSize == 'string' ? location.state.modalSize : 'md';
    const size = modalSizes[background] || modalSizes['md'];

    return (
        <Sheet modal={true} open={open} onOpenChange={(open) => {
            if (!open) {
                setOpen(false);
                setTimeout(() => {
                    navigate(-1);
                }, 400);
            }
        }}>
            <SheetContent className={cn("min-w-80 m-2 rounded-lg flex flex-col h-[calc(100dvh-1rem)] border w-full!", size)}>
                <div className={'h-full overflow-y-auto'}>
                    { children }
                </div>
            </SheetContent>
        </Sheet>
    );
};