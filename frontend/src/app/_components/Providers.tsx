'use client';

import { PropsWithChildren, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { makeStore, AppStore, RootState } from '@/store/store';
import { hydrateFromStorage, login, logout } from '@/store/userSlice';
import { safeStorage } from '@/utils/storage';

const store: AppStore = makeStore();

function PersistBridge({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const { hydrated, user } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    const saved = safeStorage.get('user') as RootState['user']['user'] | null;
    dispatch(hydrateFromStorage(saved ?? null));
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return; 
    if (user) safeStorage.set('user', user);
    else safeStorage.remove('user');
  }, [hydrated, user]);

  if (!hydrated) return null;
  return <>{children}</>;
}

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistBridge>{children}</PersistBridge>
    </Provider>
  );
}