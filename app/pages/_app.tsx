import Layout from '@/components/Layouts/Layout';
import { wrapper } from '@/store';
import type { AppProps } from 'next/app'
import { FC } from 'react';
import { Provider } from 'react-redux';
import '../styles/main.scss';

const App: FC<AppProps> = ({ Component, ...rest }) => {
   const { store, props}= wrapper.useWrappedStore(rest)
   return (
      <Provider store={store}>
         <Layout>
            <Component {...props.pageProps} />
         </Layout>
      </Provider>
        
   )
}

export default App ;

