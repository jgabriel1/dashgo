interface GenerateNumberRangeOptions {
  includeStart?: boolean;
  includeEnd?: boolean;
}

export function generateNumberRange(
  from: number,
  to: number,
  options?: GenerateNumberRangeOptions
) {
  const { includeStart, includeEnd }: GenerateNumberRangeOptions = {
    includeStart: false,
    includeEnd: true,
    ...options,
  };

  const start = includeStart ? from : from + 1;
  const end = includeEnd ? to : to - 1;

  const range = [];
  for (let i = start; i <= end; i++) range.push(i);

  return range;
}
