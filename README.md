# my-learning-analytics-embed
This repo is a companion to https://github.com/tl-its-umich-edu/my-learning-analytics. This repo will be used to maintain the javascript to embed the contextual links for the My Learning Analytics (MyLA)visualizations into the Canvas Theme.

The script can be uploaded to either the root or sub-account level in your Canvas instance. As a Canvas admin, you can navigate to the Admin icon, select an account, then click the Themes link. Open a theme in the Theme Editor and choose the Upload link to add the javascript. Note: if you're using an exitsing jasvascript, you will need to merge the multiple scripts.

After configuring and installing the MyLA LTI you need to get the toolsID associated with canvas instance and replace it with your own in the JS file. Currently the script adds the links (and associated icon) in the Gradebook, Assignments, and Files tools. If you click on any link associated with Canvas tools it will open the MyLA course view pages vs respective resources/assignment/grades links as before. Canvas doesn't support Deep LTI linking yet so we cannot link to respective MyLA views.




