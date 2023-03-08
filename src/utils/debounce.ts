export const debounce = <CB extends (...args: unknown[]) => unknown>(
  cb: (...args: Parameters<CB>) => void,
  timeout: number,
) => {
  let timerId: NodeJS.Timeout | null = null;

  return (...args: Parameters<CB>) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => cb(...args), timeout);
  };
};
