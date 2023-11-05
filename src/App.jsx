import Welcome from "./Pages/Welcome";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import RootLayout from "./components/RootLayout";
import { Suspense, lazy } from "react";

const Dashboard = lazy(()=> import('./Pages/Dashboard'));
const Transaction = lazy(()=> import('./Pages/Transactions'));
const Loan = lazy(()=> import('./Pages/Loan'));
const Transfer = lazy(()=> import('./Pages/Transfer'));
const Investment = lazy(() => import('./Pages/Investment'));
const InvestmentHistory = lazy(() => import('./Pages/investment-history'));

const router = createBrowserRouter([
  {path: '/',
  children: [
    {index: true, element: <Welcome />},
    {path: 'dashboard', element: <RootLayout />,
  children: [
    {index: true, element: <Suspense fallback={<p className="lazy-loading">Laoding</p>}>
      <Dashboard />
    </Suspense>},
  ]
},
{path: 'transaction', element: <RootLayout />,
children: [{index: true, element: <Suspense fallback={<p className="lazy-loading">Loading</p>}>
  <Transaction />
</Suspense>}]
},
{path: 'loan', element: <RootLayout />,
children: [{index: true, element: <Suspense fallback={<p className="lazy-loading">Loading</p>}>
  <Loan />
</Suspense>}]
},
{path: 'transfer', element: <RootLayout />,
children: [{index: true, element: <Suspense fallback={<p className="lazy-loading">Loading</p>}>
  <Transfer />
</Suspense>}]
},
{path: 'investment', element: <RootLayout />,
children: [{index: true, element: <Suspense fallback={<p className="lazy-loading">Loading</p>}>
  <Investment />
</Suspense>}]
},
{path: 'investment-history', element: <RootLayout />,
children: [{index: true, element: <Suspense fallback={<p className="lazy-loading">Loading</p>}>
  <InvestmentHistory />
</Suspense>}]
}
  ],
  errorElement: <p>Page not found</p>
}
]);

function App() {
  return (
    <QueryClientProvider client={queryClient} >
    <RouterProvider router={router} />
  </QueryClientProvider>
  );
}

export default App
