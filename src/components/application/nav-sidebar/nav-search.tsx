'use client'

import * as React from 'react'
import {Search, Loader2, KeyboardIcon, XIcon} from 'lucide-react'
import {Dialog, DialogTitle, DialogContent} from '@/components/ui/dialog'
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from '@/components/ui/command'
import {SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar.tsx";
import { Link, useLocation } from '@tanstack/react-router'

// Mock data for search results
const searchResults = [
    {id: 1, title: 'Dashboard', description: 'View your analytics', url: '/'},
    {id: 2, title: 'Products', description: 'Manage your product catalog', url: '/products'},
    {id: 3, title: 'Customers', description: 'View and manage customers', url: '/customers'},
    {id: 4, title: 'Orders', description: 'Track and process orders', url: '/orders'},
    {id: 5, title: 'Analytics', description: 'Gain insights into your business', url: '/analytics'},
    {id: 6, title: 'Settings', description: 'Configure your application', url: '/settings'},
]

export default function NavSearch() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const [filteredResults, setFilteredResults] = React.useState<any[]>([]);
    const location = useLocation();

    // when route is changed close the search dialog
    React.useEffect(() => {
        return () => {
            setOpen(false)
        }
    }, [location.pathname]);

    const handleSearch = (value: string) => {
        setQuery(value)

        // Clear any existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current)
        }

        if (value) {
            // Set a new timeout
            searchTimeoutRef.current = setTimeout(() => {
                setIsLoading(true)
                setFilteredResults([]);
                // Simulate API call

                setTimeout(() => {
                    setFilteredResults(searchResults.filter((result) =>
                        result.title.toLowerCase().includes(query.toLowerCase())
                    ));
                    setIsLoading(false)
                }, 200)
            }, 150) // 150ms delay before starting the search
        } else {
            setIsLoading(false);
            setFilteredResults([]);
        }
    }

    // Clean up the timeout on unmount
    React.useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current)
            }
        }
    }, [])

    return (
        <>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setOpen(true)}>
                    <Search className={'size-5!'} />
                </SidebarMenuButton>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="p-0!" aria-describedby={''} size={'md'}>
                        <DialogTitle className={'hidden'}>Search</DialogTitle>
                        <Command className="rounded-3xl border-none" shouldFilter={false}>
                            <CommandInput
                                placeholder="Type to search..."
                                value={query}
                                onValueChange={handleSearch}
                                className="border-none focus:ring-0 py-4"
                            />
                            <CommandList className="max-h-[300px] overflow-y-auto">
                                <CommandEmpty>
                                    {isLoading ? (
                                        <div className="py-6 text-center">
                                            <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground"/>
                                            <p className="mt-2 text-sm text-muted-foreground">Searching...</p>
                                        </div>
                                    ) : (query.length > 0 ? (
                                        <div className="py-6 text-center text-sm">
                                            <XIcon className="mx-auto h-6 w-6 text-muted-foreground"/>
                                            <p className="mt-2 text-muted-foreground">No results found.</p>
                                        </div>
                                    ) : (<div className="py-6 text-center text-sm">
                                        <KeyboardIcon className="mx-auto h-6 w-6 text-muted-foreground"/>
                                        <p className="mt-2 text-muted-foreground">Start typing to see results</p>
                                    </div>))}
                                </CommandEmpty>
                                {filteredResults.length > 0 && (
                                    <CommandGroup heading={'Reservations'}>
                                        {filteredResults.map((result) => (
                                            <CommandItem key={result.id} className="px-4 py-2">
                                                <Link to={result.url} className="flex flex-col items-start">
                                                    <span className="text-sm font-medium">{result.title}</span>
                                                    <span
                                                        className="text-xs text-muted-foreground">{result.description}</span>
                                                </Link>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                            </CommandList>
                        </Command>
                    </DialogContent>
                </Dialog>
            </SidebarMenuItem>
        </>
    )
}