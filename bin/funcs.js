const takeObjectFromJson = (file) => {
    const filePath = path.isAbsolute(file) ? process.cwd() : path.resolve(file);
    const read = fs.readFileSync(filePath, 'utf8');
    const readJson = JSON.parse(read);
    return readJson;
};

export default takeObjectFromJson;