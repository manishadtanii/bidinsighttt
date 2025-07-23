// ✅ buildQueryString.js
export function buildQueryString(obj) {
  const params = new URLSearchParams();

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      for (const subKey in value) {
        if (value[subKey]) {
          params.append(`${key}[${subKey}]`, value[subKey]);
        }
      }
    } else if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val) params.append(`${key}[]`, val);
      });
    } else if (value) {
      params.append(key, value);
    }
  }

  return params.toString();
}
