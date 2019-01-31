const readFile = source =>
   new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onerror = e => {
         fileReader.abort();
         reject(e);
      };
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsText(source);
   });

export default readFile;