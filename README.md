# my-learning-analytics-embed
This repo is a companion to https://github.com/tl-its-umich-edu/my-learning-analytics. This repo will be used to maintain the javascript to embed the contextual links for the My Learning Analytics (MyLA)visualizations into the Canvas Theme.

The script can be uploaded to either the root or sub-account level in your Canvas instance. As a Canvas admin, you can navigate to the Admin icon, select an account, then click the Themes link. Open a theme in the Theme Editor and choose the Upload link to add the javascript. Note: if you're using an exitsing jasvascript, you will need to merge the multiple scripts.

The script will run in a given course only if the Canvas CourseID has been added in the My Learning Analytics admin interface. Currently the script adds the links (and associated icon) in the Gradebook, Assignments, and Files tools. Note that select visualizations can be disabled in the My Learning Analytics admin interface. If a visualization is disabled, its associated link in Canvas will also be disabled.

Note: You will need to modify the `mylaToCloudFrontURLMap` variables to align with your host and cloudfront repository.
