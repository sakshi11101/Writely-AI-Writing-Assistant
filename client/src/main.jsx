import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import {PrivyProvider} from '@privy-io/react-auth';
import ai from "./images/ai.jpg"

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId="cmjx4yh6100ywkv0e8urns1nu"
      config={{
        loginMethods: ['email', 'wallet', 'google', 'twitter', 'linkedin'],
        appearance: {
          theme: 'light',
          accentColor: "#676FFF",
          logo: ai
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets'
          }
        }
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
