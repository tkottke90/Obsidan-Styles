interface DataviewQueryResult<DataType> {
  successful: boolean;
  value: {
    headers: string[]
    values: DataType[]
  }
}

export interface DataViewFile extends Record<string, any> {
  path: string
  name: string;
  folder: string;
  frontmatter: Record<string, any>;
}

export interface dv {
  el: (element: string, textContent: string, args: { cls?: string, attr?: Record<string, any> }) => void;
  current: () => { file: DataViewFile };
  paragraph: (...args: any[]) => void;
  query: <Data>(query: string) => Promise<DataviewQueryResult<Data>>;
  table: (...args: any[]) => void;
  view: (file: string, configs: Record<string, any>) => Promise<void>;

  pages: (query: string) => Iterable<DataViewFile>;
  fileLink: (file: Record<string, any>) => string;
};
