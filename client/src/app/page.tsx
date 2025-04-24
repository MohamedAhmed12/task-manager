import {QueryClient, QueryClientProvider} from "react-query";

import axiosInstance from "../../lib/axios";

const queryClient = new QueryClient();

function MyApp({Component, pageProps}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
