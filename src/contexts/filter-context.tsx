import {createContext} from "react";
import {FilterSettings, FilterSelection} from "@/components/filters/filters.tsx";

export const FilterContext = createContext<{
    settings: FilterSettings;
    selection?: FilterSelection;
    removeFilter: () => void;
    addFilter: (value: any, body: any) => void;
    // @ts-ignore
}>({});