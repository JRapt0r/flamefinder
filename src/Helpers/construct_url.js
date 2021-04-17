/**
 *  Constructs a url object with from a base url with given search params
 *
 *  @param {string} base_url - Base url
 *  @param {Object} params - Object containing search parmams for url
 */
function construct_url(base_url, params = {}) {
  if ((base_url) && (base_url?.length > 5))
  {
    const url = new URL(base_url);

    for (const key in params) {
      url.searchParams.set(key, params[key]);
    }

    return url;
  }
  else
  {
    throw new Error("No base url specified");
  }
}

export default construct_url;