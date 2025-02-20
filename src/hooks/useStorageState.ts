import { useEffect, useState } from "react";

type StorageType = "local" | "sync" | "managed";

interface StorageAdapter<T> {
  get: (key: string) => Promise<T | null>;
  set: (key: string, value: T) => Promise<void>;
}

class LocalStorageAdapter<T> implements StorageAdapter<T> {
  async get(key: string): Promise<T | null> {
    const value = localStorage.getItem(key);
    return Promise.resolve(value ? (JSON.parse(value) as T) : null);
  }

  async set(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve();
  }
}

interface UseStorageStateOptions<T> {
  storageKey: string;
  initialValue?: T | (() => T);
  storageType?: StorageType;
  onError?: (error: Error) => void;
}

export function useStorageState<T>({
  storageKey,
  initialValue,
  onError = console.error,
}: UseStorageStateOptions<T>) {
  const [state, setState] = useState<T>(() => {
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    }
    return initialValue as T;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const storage: StorageAdapter<T> = new LocalStorageAdapter();

  // storage 이벤트 리스너 추가
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === storageKey) {
        try {
          const newValue = event.newValue
            ? (JSON.parse(event.newValue) as T)
            : null;
          if (newValue !== null) {
            setState(newValue);
          }
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          setError(error);
          onError(error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [storageKey, onError]);

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedValue = await storage.get(storageKey);
        if (storedValue !== null) {
          setState(storedValue);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onError(error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadInitialData();
  }, [storageKey]);

  // 데이터 저장
  useEffect(() => {
    const saveData = async () => {
      try {
        await storage.set(storageKey, state);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onError(error);
      }
    };

    if (!isLoading) {
      void saveData();
    }
  }, [state, storageKey]);

  return {
    state,
    setState,
    isLoading,
    error,
  };
}
