import { store } from '@avi/client/shared/store';
import { Provider } from 'react-redux';

import NxWelcome from './nx-welcome';

export function App() {
  console.log('NX_PUBLIC_API_URL:', process.env.NX_PUBLIC_API_URL);
  return (
    <Provider store={store}>
      <div>
        <NxWelcome title="site" />
      </div>
    </Provider>
  );
}

export default App;
