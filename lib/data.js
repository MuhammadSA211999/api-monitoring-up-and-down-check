// dependencies
const fs = require('fs')
const path = require('path')

//module scaffolding
const lib = {}

// base directory of .data folder 
lib.basedir = path.join(__dirname, '/../.data/')
// create data and save on test folder on new file name
lib.create = (dir, file, data, callback) => {
    // open file for writing data
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptator) => {
        if (!err && fileDescriptator) {
            // not error write file and close it
            //convert the data to string
            const stringData = JSON.stringify(data)
            fs.writeFile(fileDescriptator, stringData, (err2) => {
                if (!err2) {
                    // colse the file
                    fs.close(fileDescriptator, (err3) => {
                        if (!err3) {
                            callback(`successfully created ${data}`)
                        }
                        else {
                            callback('could not close file')
                        }
                    })
                }
                else {
                    callback(`cound not write new file,it may alrady exist`)
                }
            })
        }
        else {
            callback(err)
        }
    })
}

// data reading
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf-8', (error, data) => {
        if (!error) {
            callback(data)
        }
        else {
            callback(error)
        }
    })
}

//data upadating
lib.update = (dir, file, data, callback) => {
    //open the file for updating
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileReffNum) => {

        if (!err) {
            //truncate the existing data
            fs.ftruncate(fileReffNum, (err2) => {
                if (!err2) {
                    // convert the data to string 
                    const stringData = JSON.stringify(data)
                    //write file
                    fs.writeFile(fileReffNum, stringData, (err3) => {
                        if (!err3) {
                            // close the file
                            fs.close(fileReffNum, (err4) => {
                                if (!err4) {
                                    callback(stringData)
                                }
                                else {
                                    callback(err4)
                                }
                            })
                        }
                        else {
                            callback(err3)
                        }
                    })
                }
                else {
                    callback(err2)
                }
            })
        }
        else {
            callback(err)
        }
    })
}

lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback('successfullu deleted')
        }
        else {
            callback(err)
        }
    })
}





module.exports = lib