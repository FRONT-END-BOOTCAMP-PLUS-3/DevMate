declare module "react-date-range" {
  export interface SelectionRange {
    startDate: Date;
    endDate: Date;
    key: string;
  }

  export const DateRange: React.FC<{
    ranges: SelectionRange[];
    onChange: (ranges: { selection: SelectionRange }) => void;
    moveRangeOnFirstSelection: boolean;
    rangeColors: string[];
  }>;
}
