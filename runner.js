import shell from 'shelljs';

shell.config.fatal = true;

try {
    shell.cd('./non-exist');
}
catch(ex) {
    console.log('Error');
    console.log(ex.message);
}
