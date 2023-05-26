const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export enum MutationMethod {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const handleResponse = async <TResBody>(
  response: Response,
): Promise<TResBody> => {
  if (response.status >= 300) {
    const errorMessage = response.body
      ? await response.text()
      : response.statusText;
    throw new Error(
      `Server responded with status ${response.status}: ${response.statusText}` +
        (errorMessage ? '\n' + errorMessage : ''),
    );
  }

  let parsedResponse: unknown;

  if (response.headers.get('Content-Type')?.includes('application/json')) {
    parsedResponse = await response.json();
  } else {
    parsedResponse = await response.text();
  }

  return parsedResponse as TResBody;
};

const runQuery = async <TResBody>(relativeUrl: string): Promise<TResBody> => {
  const response = await fetch(`${apiBaseUrl}${relativeUrl}`, {
    method: 'GET',
    credentials: 'include',
  });

  return await handleResponse(response);
};

const runMutation = async <TReqBody, TResBody>(
  relativeUrl: string,
  method: MutationMethod,
  payload: TReqBody,
): Promise<TResBody> => {
  const response = await fetch(`${apiBaseUrl}${relativeUrl}`, {
    method,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return await handleResponse(response);
};

export const FetchService = {
  runQuery,
  runMutation,
};
