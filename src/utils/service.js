import fetch from 'isomorphic-fetch';
import formData from 'form-urlencoded';
import queryString from 'querystring';
import omitBy from 'lodash/omitBy';

function formatResponse({
  code, status,
  message, msg,
  data,
}) {
  return {
    code: code != null ? code : status,
    status,
    message: message != null ? message : msg,
    data,
  };
}

function handleResponse(promise) {
  return promise
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return {
        status: res.status,
      };
    })
    .then((response) => {
      const res = formatResponse(response);

      if (res.code === 1 || res.code === 0) {
        return res.data;
      }

      if (res.code === -999) {
        window.location.href = `${res.data}&targetUrl=${encodeURIComponent(window.location.href)}`;
      } else {
        throw res;
      }

      return null;
    });
}

export function formatApiParams(api, params) {
  if (Array.isArray(params)) {
    return {
      newApi: api,
      newParams: params,
    };
  }

  let newApi = api;
  let newParams = { ...params };

  if (params) {
    Object.keys(params).forEach((key) => {
      const r = new RegExp(`{${key}}`);

      if (r.test(api)) {
        newApi = newApi.replace(r, params[key]);
        delete newParams[key];
      }
    });
  }

  newParams = omitBy(newParams, p => p == null);

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
        mode: 'cors',
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

  postJson(api, params, data) {
    const { newApi } = formatApiParams(api, params);

    return handleResponse(
      fetch(newApi, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

  putJson(api, params, data) {
    const { newApi } = formatApiParams(api, params);

    return handleResponse(
      fetch(newApi, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
      newApi,
      'post',
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

  deleteJson(api, params, data) {
    const { newApi } = formatApiParams(api, params);

    return handleResponse(
      fetch(newApi, {
        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
      newApi,
      'post',
    );
  },

  postFile(api, param) {
    const data = new FormData();

    data.append('file', param);

    return handleResponse(
      fetch(api, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
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
