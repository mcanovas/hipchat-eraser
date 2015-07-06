# Hipchat Eraser

This is a script done in CasperJs which deletes the 1-1 hipchat messages between the user who is log in and the user id provided. The period of time to delete message is from today to the date provided.

## Download

[Hipchat Eraser 1.0.3](https://github.com/mcanovas/hipchat-eraser/archive/1.0.3.zip)

## Dependencies

The start.sh script uses **npm**. It is important to install this executable before use **hipchar-eraser**. Phantomjs will be installed globally using **npm** automatically.

The source code is done using CasperJS which is a wrapper of PhantomJS. That's why is important to install PhantomJS with **npm**.

## How to use it

Download the zip file which link is above this comment, unzip it, and enter into the folder.

The command to launch the process is the following:

**./start.sh \<your-hipchat-host\> \<hipchat-username\> \<hipchat-password\> \<the-other-user-hipchat-id\> \<final-date-to-delete\>**

Where:

 * **\<your-hipchar-host\>**: Depending on which is your company the host changes. It makes that the script won't work. 

 	It is easy to know with is the host to write here:
 	* Login to hipchat.
 	* Get the part of the address of the host. For instance, if the url is **https://google.hipchat.com/history/member**, the right host is **google.hipchat.com**

 * **\<hipchat-username\>**: The Hipchar username what is going to delete the messages with.

 * **\<hipchat-password\>**: The password of the previous username.

 * **\<the-other-user-hipchat-id\>**: As the messages to delete are in the 1-1 conversation, the messages which will delete are the ones written by the user whose username and password has been provided, and the other user has to be specified by this property.

 The **id** id the *hipchat id* and could be got doing following steps:

 	* Login into Hipchat
 	* Click on **People Tab**
 	* From the list below select the user to see the 1-1 conversation.
 	* Looking the web address, take the last number in the url. if the url is *https://www.hipchat.com/people/show/768573* the user id is *768573*.

 * **\<final-date-to-delete\>**: **Hipchat Eraser** deletes the messages from today until the date provided in this parameter. It **MUST** be written in a specific format (**yyyy-MM-dd**). For instance: 2015-12-24