import { useState, useEffect, useCallback, useRef } from 'react';

interface UseLocalStorageDraftOptions<T> {
  key: string;
  initialValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
  debounceDelay?: number;
  throttleDelay?: number;
  maxWait?: number;
  strategy?: 'debounce' | 'throttle' | 'hybrid';
  lastSavedKey?: string;
}

interface UseLocalStorageDraftReturn<T> {
  draft: T;
  setDraft: (value: T | ((prev: T) => T)) => void;
  clearDraft: () => void;
  saveDraftImmediately: (value: T) => void;
  isLoaded: boolean;
  hasDraft: boolean;
  lastSaved: number | null;
}

const DRAFT_SUFFIX = '_draft';

// Normalize the draft key by ensuring it ends with '_draft'
function normalizeDraftKey(key: string) {
  return key.endsWith(DRAFT_SUFFIX) ? key : `${key}${DRAFT_SUFFIX}`;
}

// Denormalize the draft key by removing the '_draft' suffix if present
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function denormalizeDraftKey(key: string) {
  return key.endsWith(DRAFT_SUFFIX) ? key.slice(0, -DRAFT_SUFFIX.length) : key;
}

export function useLocalStorageDraft<T>({
  key,
  initialValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  debounceDelay = 300,
  throttleDelay = 1000,
  maxWait = 5000,
  strategy = 'hybrid',
  lastSavedKey = 'lastSaved',
}: UseLocalStorageDraftOptions<T>): UseLocalStorageDraftReturn<T> {
  const [draft, setDraft] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveTimeRef = useRef<number>(0);
  const pendingValueRef = useRef<T>(initialValue);
  const isInitialMountRef = useRef(true);
  const maxWaitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // perform serialize with lastSaved timestamp
  const performSerialize = useCallback(
    (value: T) => {
      return JSON.stringify({
        [lastSavedKey]: Date.now(),
        value: serialize(value),
      });
    },
    [lastSavedKey, serialize]
  );

  // perform deserialize to extract value
  const performDeserialize = useCallback(
    (str: string) => {
      const { [lastSavedKey]: lastSaved, value } = JSON.parse(str);
      lastSaveTimeRef.current = lastSaved || 0;
      return deserialize(value);
    },
    [lastSavedKey, deserialize]
  );

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(normalizeDraftKey(key));
      if (storedValue !== null) {
        const parsedValue = performDeserialize(storedValue);
        setDraft(parsedValue);
        pendingValueRef.current = parsedValue;
      }
    } finally {
      setIsLoaded(true);
      lastSaveTimeRef.current = Date.now();
    }
  }, [key, performDeserialize]);

  // Perform the actual save to localStorage
  const performSave = useCallback(
    (value: T) => {
      if (value === null || value === undefined) {
        localStorage.removeItem(normalizeDraftKey(key));
      } else {
        const serializedValue = performSerialize(value);
        localStorage.setItem(normalizeDraftKey(key), serializedValue);
      }
      const now = Date.now();
      lastSaveTimeRef.current = now;

      // Clear pending value after save
      pendingValueRef.current = value;
      // Clear timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    },
    [key, performSerialize]
  );

  // Save function with multiple optimization strategies
  const saveToStorage = useCallback(
    (value: T) => {
      const now = Date.now();
      pendingValueRef.current = value;

      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
        maxWaitTimeoutRef.current = null;
      }

      // Set up max wait timeout (ensures save happens at least every maxWait ms)
      maxWaitTimeoutRef.current = setTimeout(() => {
        performSave(pendingValueRef.current);
        lastSaveTimeRef.current = Date.now();
      }, maxWait);

      // Apply different saving strategies
      switch (strategy) {
        case 'debounce':
          // Pure debounce: wait for inactivity
          timeoutRef.current = setTimeout(() => {
            performSave(value);
          }, debounceDelay);
          break;

        case 'throttle':
          // Pure throttle: save at most every throttleDelay ms
          if (now - lastSaveTimeRef.current >= throttleDelay) {
            performSave(value);
          } else {
            timeoutRef.current = setTimeout(
              () => {
                performSave(pendingValueRef.current);
              },
              throttleDelay - (now - lastSaveTimeRef.current)
            );
          }
          break;

        case 'hybrid':
        default:
          // Hybrid approach: throttle + debounce + maxWait
          const timeSinceLastSave = now - lastSaveTimeRef.current;

          // If we haven't saved in a while, save immediately
          if (timeSinceLastSave >= throttleDelay) {
            performSave(value);
          } else {
            // Otherwise, debounce the save
            timeoutRef.current = setTimeout(() => {
              performSave(pendingValueRef.current);
            }, debounceDelay);
          }
          break;
      }
    },
    [debounceDelay, throttleDelay, maxWait, strategy, performSave]
  );

  // Save when draft changes
  useEffect(() => {
    if (!isLoaded || isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    saveToStorage(draft);
  }, [draft, isLoaded, saveToStorage]);

  // Cleanup on unmount - save any pending changes
  useEffect(() => {
    return () => {
      // Save immediately on unmount if there are pending changes
      if (pendingValueRef.current !== draft) {
        performSave(pendingValueRef.current);
      }

      // Clear all timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
      }
    };
  }, [performSave, draft]);

  // Stable setDraft function with shallow comparison
  const setDraftStable = useCallback((value: T | ((prev: T) => T)) => {
    setDraft(prev => {
      const newValue =
        typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;

      // Only update if the value actually changed
      if (JSON.stringify(newValue) === JSON.stringify(prev)) {
        return prev;
      }

      return newValue;
    });
  }, []);

  // Clear draft from localStorage
  const clearDraft = useCallback(() => {
    // Clear any pending saves
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxWaitTimeoutRef.current) {
      clearTimeout(maxWaitTimeoutRef.current);
      maxWaitTimeoutRef.current = null;
    }

    localStorage.removeItem(normalizeDraftKey(key));
    setDraft(initialValue);
    pendingValueRef.current = initialValue;
    lastSaveTimeRef.current = Date.now();
  }, [key, initialValue]);

  // Manually save draft immediately (bypasses all optimizations)
  const saveDraftImmediately = useCallback(
    (value: T) => {
      // Clear any pending saves
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
        maxWaitTimeoutRef.current = null;
      }

      performSave(value);
      setDraft(value);
      pendingValueRef.current = value;
    },
    [performSave]
  );

  return {
    draft,
    setDraft: setDraftStable,
    clearDraft,
    saveDraftImmediately,
    isLoaded,
    hasDraft: draft !== null && draft !== undefined && draft !== initialValue,
    lastSaved: lastSaveTimeRef.current || null,
  };
}

//  form hook with throttling support
export function useFormDraft<T extends Record<string, unknown>>(
  key: string,
  initialFormData: T,
  options?: Omit<UseLocalStorageDraftOptions<T>, 'key' | 'initialValue'>
) {
  const {
    draft: formData,
    setDraft: setFormData,
    clearDraft,
    saveDraftImmediately,
    isLoaded,
    hasDraft,
    lastSaved,
  } = useLocalStorageDraft({
    key,
    initialValue: initialFormData,
    ...options,
  });

  // Optimized field update
  const updateField = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      setFormData(prev => {
        // Only update if the field value actually changed
        if (prev[field] === value) {
          return prev;
        }

        return {
          ...prev,
          [field]: value,
        };
      });
    },
    [setFormData]
  );

  // Batch update multiple fields
  const updateFields = useCallback(
    (updates: Partial<T>) => {
      setFormData(prev => {
        let hasChanges = false;

        // Check if any fields actually changed
        for (const [key, value] of Object.entries(updates)) {
          if (prev[key as keyof T] !== value) {
            hasChanges = true;
            break;
          }
        }

        if (!hasChanges) {
          return prev;
        }

        return {
          ...prev,
          ...updates,
        };
      });
    },
    [setFormData]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    clearDraft();
  }, [setFormData, initialFormData, clearDraft]);

  return {
    formData,
    setFormData,
    updateField,
    updateFields,
    clearDraft: resetForm,
    saveDraft: saveDraftImmediately,
    isLoaded,
    hasDraft,
    lastSaved,
  };
}

// Utility function to get storage statistics
export const getDraftStorageStats = (
  key: string,
  lastSavedKey: string = 'lastSaved'
) => {
  const item = localStorage.getItem(normalizeDraftKey(key));
  if (!item) return null;
  const parsedItem = JSON.parse(item);
  if (
    !parsedItem ||
    typeof parsedItem !== 'object' ||
    !(lastSavedKey in parsedItem)
  )
    return null;

  const value = JSON.stringify(parsedItem.value || item);
  return {
    size: new Blob([value]).size,
    lastModified: null, // You could store metadata in the value if needed
    hasData: true,
  };
};

// Utility to clean up old drafts
export const cleanupOldDrafts = (
  maxAgeMs: number = 7 * 24 * 60 * 60 * 1000, // Default: 7 days
  lastSavedKey: string = 'lastSaved'
) => {
  const now = Date.now();
  let cleanedCount = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.endsWith(DRAFT_SUFFIX)) {
      const item = localStorage.getItem(key);
      if (item) {
        // Simple check - if you store timestamp in your data, you could use it
        // check if json parsed item  is an object and has lastSavedKey
        const parsedItem = JSON.parse(item);
        if (typeof parsedItem === 'object' && lastSavedKey in parsedItem) {
          const lastSaved = parsedItem[lastSavedKey];

          const age = now - (lastSaved || 0);
          if (age < maxAgeMs) continue;

          // For now, we'll just clean based on key pattern
          localStorage.removeItem(key);
          cleanedCount++;
        }
      }
    }
  }

  return cleanedCount;
};
