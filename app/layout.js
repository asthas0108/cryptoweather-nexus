"use client"
import './globals.css';
import { Provider } from 'react-redux';
import store from '../store';
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
          <Toaster position="bottom-right" />
        </Provider>
        
      </body>
    </html>
  );
}
