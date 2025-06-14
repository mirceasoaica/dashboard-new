import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useState } from 'react'
import { AppContext } from '@/AppContext'
import { Toaster } from '@/components/ui/toaster'
import Layout from '@/components/layout'
import AppLoader from '@/components/application/app-loader'
import { UnauthorizedAccess } from '@/components/application/unauthorized-access'
import { ReactivateSubscription } from '@/components/application/reactivate-subscription'
import api from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Settings } from '@onemineral/pms-js-sdk'

function RootRoute() {
  const [hasAccess, setHasAccess] = useState(false)
  const [askForPayment, setAskForPayment] = useState(false)
  const [zIndexStack, setZIndexStack] = useState([1000001])

  const { isLoading, data }: { isLoading: boolean, data: Settings | undefined } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      try {
        const settings = (await api.settings.fetch()).response
        setHasAccess(true)
        setAskForPayment(settings.subscription?.is_active === false)
        return settings
      } catch (e: any) {
        console.error(e)
        if (e.statusCode === 404) {
          setHasAccess(false)
          return { response: { schema: {} } }
        }
      }
    },
  })

  if (isLoading) return <AppLoader />
  if (!hasAccess) return <UnauthorizedAccess />
  if (askForPayment) return <ReactivateSubscription />

  return (
    <AppContext.Provider
      value={{
        ...data,
        zIndexStack,
        setZIndexStack,
      } as any}
    >
      <Layout>
        <Outlet />
        <TanStackRouterDevtools />
      </Layout>
      <Toaster />
    </AppContext.Provider>
  )
}

export const Route = createRootRoute({
  component: RootRoute,
})