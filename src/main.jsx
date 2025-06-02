import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import { router } from './routes';
import Aos from 'aos';
import 'aos/dist/aos.css';


Aos.init({
  duration: 1000,
  once: true,
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
