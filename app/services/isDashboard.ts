export async function isDashboard() {
    const currentFile = () => __filename;
    const result = () => currentFile().split(".next\\server\\app")[1];
    const resultFinal = result().substring(0, result().lastIndexOf("\\"));
    console.log(resultFinal);
    return resultFinal;
};
