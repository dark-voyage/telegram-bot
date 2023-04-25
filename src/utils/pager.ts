const pager = <T>(json: T[], page_number: number, page_size = 5): T[] => {
  return json.slice((page_number - 1) * page_size, page_number * page_size);
};

export default pager;
