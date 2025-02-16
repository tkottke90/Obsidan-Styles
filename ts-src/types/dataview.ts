interface DataviewQueryResult<DataType> {
  successful: boolean;
  value: {
    headers: string[]
    values: DataType[]
  }
}

export interface dv {
  el: (element: string, textContent: string, args: { cls?: string, attr?: Record<string, any> }) => void;
  paragraph: (...args: any[]) => void;
  query: <Data>(query: string) => Promise<DataviewQueryResult<Data>>;
  table: (...args: any[]) => void;
  view: (file: string, configs: Record<string, any>) => Promise<void>;
};
