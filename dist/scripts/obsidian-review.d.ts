interface DataviewQueryResult<DataType> {
    successful: boolean;
    value: {
        headers: string[];
        values: DataType[];
    };
}
declare function getVaultTypes(): Promise<void>;
declare function getNotesWithoutTypes(): Promise<void>;
