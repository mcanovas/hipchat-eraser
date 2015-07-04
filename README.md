# hipchat-eraser

## Dependencies

The start.sh script uses 'nmp'. It is important to install this executable before use 'hipchar-eraser'. Phantomjs will be installed globally using 'npm' automatically.

The source code is done using CasperJS which is a wrapper of PhantomJS. That's why is important to install PhantomJS with 'npm'.

## How to use it

The command to launch the process is the following:

./start.sh \<your-hipchat-host\> \<hipchat-username\> \<hipchat-password\> \<the-other-user-hipchat-id\> \<date-until-delete\>