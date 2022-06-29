import FillingsAdmin from "./components/UI/Admin/FillingsAdmin";
import MenuAdmin from "./components/UI/Admin/MenuAdmin";
import ProductsAdmin from "./components/UI/Admin/ProductsAdmin";
import UsersAdmin from "./components/UI/Admin/UsersAdmin";
import AdminPage from "./pages/AdminPage";
import CabinetPage from "./pages/CabinetPage";
import CategoryPage from "./pages/CategoryPage";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import OneItemPage from "./pages/OneItemPage";
import ProductsPage from "./pages/ProductsPage";
import { ADMIN_FELLINGS_ROUTE, ADMIN_MENU_ROUTE, ADMIN_PRODUCTS_ROUTE, ADMIN_ROUTE, ADMIN_USERS_ROUTE, CABINET_ROUTE, CATEGORY_ROUTE, MAINPAGE_ROUTE, NOTFOUND_ROUTE, ONEITEM_ROUTE, PRODUCTS_ROUTE } from "./utils/constants";

export const authRoutes = [
    {
        path : CABINET_ROUTE,
        element : <CabinetPage />
    }
]

export const publickRoutes = [
    {
        path : MAINPAGE_ROUTE,
        element : <MainPage />
    },
    {
        path : PRODUCTS_ROUTE,
        element : <ProductsPage />
    },
    {
        path : CATEGORY_ROUTE,
        element : <CategoryPage />
    },
    {
        path : ONEITEM_ROUTE,
        element : <OneItemPage />
    },
    {
        path : NOTFOUND_ROUTE,
        element : <NotFound />
    }
]

export const adminRoutes = [
    {
        path : ADMIN_ROUTE,
        element : <AdminPage />,
        childList : [
            {
                path : ADMIN_USERS_ROUTE,
                element : <UsersAdmin />
            },
            {
                path : ADMIN_PRODUCTS_ROUTE,
                element : <ProductsAdmin />
            },
            {
                path : ADMIN_FELLINGS_ROUTE,
                element : <FillingsAdmin />
            },
            {
                path : ADMIN_MENU_ROUTE,
                element : <MenuAdmin />
            }
        ]
    }
]