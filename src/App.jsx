import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import cats from './mockData/cats.json';
import CatForm from './components/CatForm';
import CatShow from './components/CatShow';
import CatsIndex from './components/CatsIndex';
import Navigation from './components/Navigation';
import PhotoShow from './components/PhotoShow';
import TogglePhotoType from './components/TogglePhotoType';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navigation />
          <Outlet />
        </>
      ),
      children: [
        {
          index: true,
          element: <CatsIndex cats={cats} />,
        },
        {
          path: '/cats/new',
          element: <CatForm cats={cats} />,
        },
        {
          path: '/cats/:catId',
          element: <CatShow cats={cats} />,
        },
        {
          path: '/photo',
          element: <PhotoShow cats={cats} />,
        },
        {
          path: '/toggle-photo-type',
          element: <TogglePhotoType cats={cats} />,
        },
        {
          path: '*',
          element: <div>Page Not Found</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
