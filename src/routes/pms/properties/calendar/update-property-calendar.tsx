import {Button} from "@/components/ui/button.tsx";
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
import {CalendarIcon, CircleAlert} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {cn} from "@/lib/utils.ts";
import { Page, PageContent, PageDescription, PageHeader, PageTitle } from "@/components/page.tsx";
import useWobbleAnimate from "@/hooks/use-wobble-animate.ts";
import FixedFormActions from "@/components/fixed-form-actions.tsx";

export default function UpdatePropertyCalendar() {
    const {ref, wobble} = useWobbleAnimate();
    
    const form = useForm({
        
    });

    const { isDirty } = form.formState;

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
    }


    return <Page modal size="md" validateClose={() => {
        if(isDirty) {
            wobble();
            return false;
        }
        return true;
    }}>
        <PageHeader>
                <PageTitle>
                    Are you absolutely sure?
                </PageTitle>
                <PageDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </PageDescription>
        </PageHeader>

        <PageContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={'pt-6'}>
                        <FormField
                            control={form.control}
                            name="daterange"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
                                    <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "max-w-[300px] w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value?.from ? (
                                                        field.value?.to ? (
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
                                            />
                                            <Button type={"button"} variant={"ghost"} className={'mb-3'} onClick={() => field.onChange(null)}>Clear</Button>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FixedFormActions visible={isDirty} ref={ref} className={'justify-start'}>
                        <CircleAlert className={'text-orange-300 size-5 ml-1'}/>
                        <div className={'mr-10 text-muted-foreground font-semibold'}>
                            Unsaved changes
                        </div>
                        <Button variant={"outline"} type={'reset'} className={''} size={'sm'} onClick={() => form.reset()}>Reset</Button>
                        <Button variant={'default'} type={'submit'} size={'sm'}>Save</Button>
                    </FixedFormActions>
                </form>
            </Form>
        </PageContent>
    </Page>
}