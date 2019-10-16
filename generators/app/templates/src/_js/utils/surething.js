export const axiosSureThing = promise =>
  promise
    .then(({ data }) => ({ ok: true, data }))
    .catch(error =>
      Promise.resolve({ ok: false, data: error?.response?.data, error })
    );

export default promise =>
  promise
    .then(response => ({ ok: true, response }))
    .catch(error => Promise.resolve({ ok: false, error }));
