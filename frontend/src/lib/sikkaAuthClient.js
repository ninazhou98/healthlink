// sikkaAuthClient.js

const API_BASE_URL = "https://api.sikkasoft.com/v4";

let requestKey = null;
let requestKeyExpiry = 0;
let refreshKey = null;

let appId = '';
let appKey = '';
let officeId = '';

/**
 * Initialize the module with your app credentials
 */
export function initSikkaAuth({ app_id, app_key, office_id }) {
  if (!app_id || !app_key || !office_id) {
    throw new Error('Missing required app_id, app_key, or office_id.');
  }
  appId = app_id;
  appKey = app_key;
  officeId = office_id;
}

/**
 * Fetch a new request key using full authorization flow
 */
async function fetchRequestKeyFromScratch() {
  const secretResp = await fetch(`${API_BASE_URL}/authorized_practices/${officeId}`, {
    method: 'GET',
    headers: { 'App-Id': appId, 'App-Key': appKey }
  });

  if (!secretResp.ok) {
    const text = await secretResp.text();
    throw new Error(`Failed to fetch secret key: ${text}`);
  }

  const secretData = await secretResp.json();
  const secretKey = secretData?.items?.[0]?.secret_key;

  if (!secretKey) {
    throw new Error('Secret key missing.');
  }

  const payload = {
    grant_type: 'request_key',
    office_id: officeId,
    secret_key: secretKey,
    app_id: appId,
    app_key: appKey
  };

  const tokenResp = await fetch(`${API_BASE_URL}/request_key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!tokenResp.ok) {
    const text = await tokenResp.text();
    throw new Error(`Failed to generate request key: ${text}`);
  }

  const tokenData = await tokenResp.json();
  updateKeysFromResponse(tokenData);
}

/**
 * Refresh request key using existing refresh token
 */
async function refreshRequestKey() {
  const payload = {
    grant_type: 'refresh_key',
    app_id: appId,
    app_key: appKey
  };

  const resp = await fetch(`${API_BASE_URL}/request_key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    throw new Error(`Refresh request key failed: ${resp.status}`);
  }

  const data = await resp.json();
  updateKeysFromResponse(data);
}

/**
 * Helper to update in-memory keys
 */
function updateKeysFromResponse(data) {
  requestKey = data?.request_key;
  refreshKey = data?.refresh_key;
  
  const expiresInSeconds = parseInt(data?.expires_in?.split(' ')[0], 10) || 86400;
  requestKeyExpiry = Date.now() + (expiresInSeconds * 1000);

  if (!requestKey || !refreshKey) {
    throw new Error('Invalid token response: missing request_key or refresh_key');
  }
}

/**
 * Get valid request key - refresh or re-auth if needed
 */
export async function getRequestKey() {
  const now = Date.now();

  if (!requestKey || now >= requestKeyExpiry - 5 * 60 * 1000) { // Refresh 5 min early
    try {
      if (refreshKey) {
        await refreshRequestKey();
      } else {
        await fetchRequestKeyFromScratch();
      }
    } catch (err) {
      console.error('Token refresh failed, retrying full auth:', err.message);
      await fetchRequestKeyFromScratch();
    }
  }

  return requestKey;
}

/**
 * Call Sikka API with auto-handling auth
 */
export async function sikkaApiCall(endpoint, options = {}) {
  const key = await getRequestKey();

  const headers = {
    ...(options.headers || {}),
    'Request-Key': key
  };

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    ...options,
    headers
  });

  if (response.status === 429) {
    throw new Error('Rate limit exceeded. Slow down.');
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Sikka API error: ${response.status} - ${text}`);
  }

  return response.json();
}

/**
 * Invalidate current request key
 */
export async function invalidateRequestKey() {
  if (!refreshKey) return;

  await fetch(`${API_BASE_URL}/refresh_key`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Refresh-Key': refreshKey,
      'App-Id': appId,
      'App-Key': appKey
    }
  });

  requestKey = null;
  refreshKey = null;
  requestKeyExpiry = 0;
}
