import { useQueryClient } from '@tanstack/react-query';

export const logReactQueryCache = () => {

  const queryClient = useQueryClient();

    const queries = queryClient.getQueryCache().getAll();
  
    console.log("🔍 --- React Query Cache Dump Start --- 🔍");
  
    queries.forEach((query) => {
      const queryKey = query.queryKey;
      const queryData = query.state.data;
  
      console.log(`\nQuery Key:`, queryKey);
      console.log(`Data:`, queryData);
    });
  
    console.log("--- React Query Cache Dump End ---");
  };