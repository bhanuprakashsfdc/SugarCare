import { getItemBySlug } from '@/data/preparationData';
import { getStoredData, setStoredData } from '@/utils/helpers';

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function getCacheKey(planId, itemId) {
  return `${planId}:${itemId}`;
}

export async function fetchPreparationItem(planId, itemId, { retries = 3, signal } = {}) {
  const cacheKey = getCacheKey(planId, itemId);
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  let lastError;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, 200 + Math.random() * 300);
        signal?.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new DOMException('Aborted', 'AbortError'));
        }, { once: true });
      });

      const item = getItemBySlug(planId, itemId);

      if (!item) {
        throw new Error(`Item not found: ${planId}/${itemId}`);
      }

      const savedState = getStoredData(`prep_${item.id}`, null);

      cache.set(cacheKey, { data: { item, savedState }, timestamp: Date.now() });

      return { item, savedState };
    } catch (error) {
      lastError = error;
      if (error.name === 'AbortError') throw error;
      if (attempt < retries - 1) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export function clearPreparationCache(planId, itemId) {
  if (planId && itemId) {
    cache.delete(getCacheKey(planId, itemId));
  } else {
    cache.clear();
  }
}

export function savePreparationState(itemId, state) {
  setStoredData(`prep_${itemId}`, state);
  clearPreparationCache(null, itemId);
}

export function getShoppingList() {
  return getStoredData('shoppingList', []);
}

export function addToShoppingList(items) {
  const current = getShoppingList();
  const newItems = items.filter(item => !current.some(c => c.name === item.name));
  const updated = [...current, ...newItems];
  setStoredData('shoppingList', updated);
  return updated;
}

export function removeFromShoppingList(itemName) {
  const current = getShoppingList();
  const updated = current.filter(item => item.name !== itemName);
  setStoredData('shoppingList', updated);
  return updated;
}
