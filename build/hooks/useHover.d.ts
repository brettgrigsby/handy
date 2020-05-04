/// <reference types="react" />
declare type UseHoverType<T extends HTMLElement> = [React.RefObject<T>, boolean];
declare function useHover<T extends HTMLElement>(): UseHoverType<T>;
export default useHover;
