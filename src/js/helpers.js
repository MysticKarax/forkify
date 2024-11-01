import { TIMEOUT_SEC } from "./config";

const timeOut = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(
        new Error(`Request took too long! Time Out After: ${sec} seconds`)
      );
    }, sec * 1000);
  });
};
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeOut(TIMEOUT_SEC)]);

    // 1.a Esperar la respuesta y convertirla a JSON
    const data = await res.json();

    if (!res.ok)
      throw new Error(`Message: ${data.message} Status: ${res.status}`);

    return data;
  } catch (error) {
    throw error;
  }
};
