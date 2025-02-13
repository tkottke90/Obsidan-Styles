declare namespace dv {
  function el(element: string, textContent: string, args: { cls?: string, attr?: Record<string, any> }): void;
  function paragraph(...args: any[]): void;
  function query(query: string): any;
  function table(...args: any[]): void;
  function view(file: string, configs: Record<string, any>): void;
};
