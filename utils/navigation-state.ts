// navigation-state.ts
export let currentPathname: string = '';

export const setCurrentPathname = (path: string) => {
  currentPathname = path;
};
