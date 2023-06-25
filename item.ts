interface Download {
  title: string;
  httpHeaders?: Record<string, string>;
  episodes: string[];
}

const downloadList: Download = {
  title: "",
  httpHeaders: undefined,
  episodes: [""],
};

export default downloadList;
