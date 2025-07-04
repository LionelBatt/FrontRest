class CacheService {
    static cache = new Map();

    // Get avec expiration simple
    static get(key) {
        const item = localStorage.getItem(`cache_${key}`);
        if (!item) return null;

        try {
            const { value, expiry } = JSON.parse(item);

            if (Date.now() > expiry) {
                localStorage.removeItem(`cache_${key}`);
                return null;
            }

            return value;
        } catch {
            return null;
        }
    }

    static set(key, value, ttlMinutes = 30) {
        const item = {
            value,
            expiry: Date.now() + (ttlMinutes * 60 * 1000)
        };

        localStorage.setItem(`cache_${key}`, JSON.stringify(item));
    }

    static async fetchWithCache(key, url, ttlMinutes = 30) {
        const cached = this.get(key);
        if (cached) {
            console.log(`📦 Cache: ${key}`);
            console.log("Réponse brute: ", cached);
            return cached;
        }
        // Sinon faire l'appel API‡
        console.log(`API: ${key}`);
        const response = await fetch(url);
        console.log("Status:", response.status);


        if (response.status === 200) {
            const result = await response.json();
            console.log("Réponse brute: ", result);
            this.set(key, result.data, ttlMinutes);
            return result.data;
        }

        throw new Error(response.message || 'Erreur API');
    }

    static clear() {
        Object.keys(localStorage)
            .filter(key => key.startsWith('cache_'))
            .forEach(key => localStorage.removeItem(key));
    }
}

export default CacheService;