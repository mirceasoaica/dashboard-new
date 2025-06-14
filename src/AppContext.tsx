import {
    Currency,
    Language,
    Onboarding,
    Profile,
    Subscription,
    Tenant,
} from '@onemineral/pms-js-sdk';
import { createContext } from 'react';
import Schema from "@/models/Schema.ts";

export const AppContext = createContext<{
    schema: Schema;
    profile: Profile;
    languages: Language[];
    tenant: Tenant;
    currencies: Currency[];
    onboarding: Onboarding;
    redirect_to: string;
    subscription?: Subscription;
    zIndexStack: number[];
    setZIndexStack: (value: number[]) => void;
    // @ts-ignore
}>({});
