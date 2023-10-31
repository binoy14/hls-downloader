interface Download {
  title: string;
  httpHeaders?: Record<string, string>;
  episodes?: string[];
  /**
   * If streamUrl is specified episodes will be ignored
   */
  streamUrl?: string;
}

const downloadList: Download = {
  title: "",
  httpHeaders: undefined,
  streamUrl: undefined,
  episodes: [],
};

export default downloadList;
