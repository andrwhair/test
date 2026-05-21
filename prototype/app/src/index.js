import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import '@fs/react-scripts/polyfills'
import Root, { FrontierBaseProviders } from '@fs/zion-root'
import { AppLayout } from '@fs/zion-ui'
import { NoticeLoading } from '@fs/zion-icon'
import App from './App'
import './locales'

const FrontierWrapper = () => (
  <Root analytics header={{ hidden: true }} footer={{ hidden: true }}>
    <AppLayout fullWidth>
      <App />
    </AppLayout>
  </Root>
)

const FrontierRoot = () => (
  <React.StrictMode>
    <Suspense fallback={<NoticeLoading />}>
      <FrontierBaseProviders>
        <FrontierWrapper />
      </FrontierBaseProviders>
    </Suspense>
  </React.StrictMode>
)

ReactDOM.render(<FrontierRoot />, document.getElementById('root'))
