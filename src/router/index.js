import ClientListPage from '../pages/ClientListPage'
import ClientPage from '../pages/ClientPage'

export const routes = [
//   { id: 1, path: "./", component: <MainPage /> },
//   { id: 2, path: "/dishes", component: <Dishes /> },
//   { id: 3, path: "/stock", component: <Stock /> },
//   { id: 4, path: "/finance", component: <Finance /> },
//   { id: 5, path: "/staff", component: <Staff /> },
//   { id: 6, path: "/isntegrations", component: <Integrations /> },
//   { id: 7, path: "/subscription", component: <Subscription /> },
//   { id: 8, path: "/settings", component: <Settings /> },
  {id: 9, path: "/clients", component: <ClientListPage/>},
  {id: 10, path: "/client/:id", component: <ClientPage/>}

];

