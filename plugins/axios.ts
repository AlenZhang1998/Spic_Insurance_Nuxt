import axios from 'axios';
import type { AxiosInstance } from 'axios';

const isAbsoluteUrl = (input: string) => /^https?:\/\//i.test(input);

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const rawBaseURL = config.public?.apiBase?.trim();

  const baseURL = rawBaseURL && isAbsoluteUrl(rawBaseURL) ? rawBaseURL : undefined;

  const instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: false,
  });

  return {
    provide: {
      axios: instance,
      api: instance,
    },
  };
});
