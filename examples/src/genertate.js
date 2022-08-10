const fs = require("fs");
const path = require("path")
let inputPath = path.resolve(__dirname, 'views')

const genertateFc = ()=> {
    fs.readdir(inputPath,(err,files)=>{
        if (err) {
            console.log(err);
        } else{
            // console.log(files); 返回的文件是个数组,可以用forEach循环输出文件名
            files.forEach((x)=>{
                readFile(x);
            })
        }
    })
}

const readFile = (dir) => {
    fs.readFile(path.resolve(inputPath,dir, 'index.vue'),(err,data)=>{
        if (err) {
            console.log(err)
        } else{
            writeFile(path.resolve(inputPath,dir), data.toString());
        }
    });
}

const writeFile = (dir,data) => {
    let content = '```vue \n \n'+
        data +
        '\n ```'
    if (fs.existsSync(path.join(dir, 'index.md'))) {
        fs.rmSync(path.join(dir, 'index.md'))
    }

    fs.writeFile(path.join(dir, 'index.md'),content,(err,data)=>{
        if (err) {
            console.log(err);
        } else{
            console.log('文件写入成功')
        }
    })
}


genertateFc()


