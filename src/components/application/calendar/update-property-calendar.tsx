import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button.tsx";
import {Property} from "@onemineral/pms-js-sdk";
import {useForm} from "react-hook-form";
import {useToast} from "@/hooks/use-toast.ts";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {cn} from "@/lib/utils.ts";

export default function UpdatePropertyCalendar({open = false, property, daterange, onClose, onSaved}: {
    open: boolean,
    property: Property | null,
    daterange: { from: Date, to: Date } | null,
    onClose: () => void,
    onSaved: () => void
}) {
    const form = useForm({
        values: {
            daterange
        }
    });
    const { toast } = useToast();

    function onSubmit(data: any) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-foreground p-4">
          <code className="text-background">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        });

        onSaved();
        onClose();
    }


    return <Dialog modal={true} open={open && !!property} onOpenChange={() => onClose()}>
        <DialogContent className={'sm:max-w-5xl w-full'} onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
                <img src={'/public/icon.svg'} alt={'icon'} className={'size-8'}/>
                <DialogTitle>
                    Are you absolutely sure?
                </DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={'py-6'}>
                        <FormField
                            control={form.control}
                            name="daterange"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline-solid"}
                                                    className={cn(
                                                        "max-w-[300px] w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value?.from ? (
                                                        field.value.to ? (
                                                            <>
                                                                {format(field.value.from, "LLL dd, y")} -{" "}
                                                                {format(field.value.to, "LLL dd, y")}
                                                            </>
                                                        ) : (
                                                            format(field.value.from, "LLL dd, y")
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 flex flex-col items-center" align="start">
                                            <Calendar
                                                mode="range"
                                                selected={field.value || undefined}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                            <Button type={"button"} variant={"ghost"} className={'mb-3'} onClick={() => field.onChange(null)}>Clear</Button>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"ghost"} type="button" onClick={onClose}>Cancel</Button>
                        </DialogClose>

                        <Button type="submit" variant={'default'}>Save changes</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}