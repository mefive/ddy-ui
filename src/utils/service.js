import queryString from 'querystring';
import fetch from 'isomorphic-fetch';
import formData from 'form-urlencoded';

function handleResponse(promise, url, method) {
  return promise
    .then((res) => {
      if (res.status !== 200) {
        throw Object({ status: res.status });
      } else {
        return res.json();
      }
    })
    .then(({
      code, data, message, models,
    }) => {
      if (+code === 0) {
        if (data != null) {
          return data;
        }

        return models;
      } else if (code) {
        console.error('network error', {
          code, message, url, method,
        });

        throw Object({
          code, message, url, method,
        });
      }

      return null;
    });
}

export function formatApiParams(api, params) {
  let newApi = api;
  const newParams = { ...params };

  if (params) {
    Object.keys(params).forEach((key) => {
      const r = new RegExp(`{${key}}`);

      if (r.test(api)) {
        newApi = newApi.replace(r, params[key]);
        delete newParams[key];
      }
    });
  }

  return {
    newApi,
    newParams,
  };
}

export default {
  get(api, params) {
    const { newApi, newParams } = formatApiParams(api, params);

    const url = newParams && Object.keys(newParams).length > 0
      ? `${newApi}?${queryString.stringify(newParams)}`
      : newApi;

    return handleResponse(
      fetch(url, {
        credentials: 'include',
      }),
      url,
      'get',
    );
  },

  post(api, params) {
    const { newApi, newParams } = formatApiParams(api, params);

    return handleResponse(
      fetch(newApi, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData(newParams),
      }),
      newApi,
      'post',
    );
  },

  postJson(api, params) {
    const { newApi, newParams } = formatApiParams(api, params);

    return handleResponse(
      fetch(newApi, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newParams),
      }),
      newApi,
      'post',
    );
  },

  put(api, params) {
    const { newApi, newParams } = formatApiParams(api, params);

    return handleResponse(
      fetch(newApi, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData(newParams),
      }),
      newApi,
      'put',
    );
  },

  putJson(api, params) {
    const { newApi, newParams } = formatApiParams(api, params);

    return handleResponse(
      fetch(newApi, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newParams),
      }),
      newApi,
      'put',
    );
  },

  delete(api, params) {
    const { newApi, newParams } = formatApiParams(api, params);

    const url = newParams
      ? `${newApi}?${queryString.stringify(newParams)}`
      : newApi;

    return handleResponse(
      fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData(newParams),
      }),
      newApi,
      'put',
    );
  },

  postFile(api, param) {
    const data = new FormData();

    data.append('file', param);

    return handleResponse(
      fetch(api, {
        method: 'POST',
        mode: 'cors',
        body: data,
      }),
      api,
      'post',
    );
  },

  genUrl(api, params) {
    return params ?
      `${api}?${queryString.stringify(params)}`
      : api;
  },
};
