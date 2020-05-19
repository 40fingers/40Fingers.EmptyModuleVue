# 40FINGERS EmptyModuleVue
At 40Fingers we've been creating "EmptyModules" for several years. We use them as a template for custom modules we need to build for our customers.
Yes, an EmptyModule will work when installed, but it's functionality is never very spectacular. You will, however, be able to use the module's source as an example for your own modules.

Over the years we have used EmptyModules for
* A basic DNN module in c# (as of DNN5 if I'm not mistaken)
* A VB.net version of that same basic thing
* A module using razor to render HTML and using DNN ServiceFramework
* A DNN SPA module using Knockout and Entity Framework
* A DNN MVC module, also using Knockout and Entity Framework

This is the latest addition to that line, and the first to be published as open source: a DNN module using VueJS and Entity Framework 6.

## About EmptyModuleVue
This very EmptyModule is initially based on Chris Hammond's SPA Module Template. I've at the time changed that to my own likings. For example, I added Entity Framework to it.
Recently (May 2020) I started looking into VueJS and decided to create a new version of EmptyModuleSpa based on VueJS.

This is my first experience with VueJS, but I already learned there are several ways to create a VueJS DNN module. I chose the X-Template approach because it will allow me to 
nicely separate templates and script (although you could still place them close to one another) and it gives me the easy copy-and-run functionality without needing a running compiler.

Besides the learning curve (which isn't all that steep for VueJS), the main issue I ran across, was to allow multiple instances of the module to be placed on the same page.
## Using EmptyModuleVue
The intended use for this module is take the source into a folder on your own machine and then:
* Search for "EmptyModuleVue" in all files (don't forget files in subfolders) and replace it with "YourModule"
  * please note that your module name will be used in a namespace too, so make sure that's allowed
* Rename EmptyModuleVue.dnn, EmptyModuleVue.csproj and EmptyModuleVue.sln
* Make a copy of /BuildScripts/custom.xml.sample and name it /BuildScripts/custom.xml
* Change the path in the xml file to your DNN (9.5.1 or above) installation
  * If you wish to build for another version of DNN: that shouldn't be a problem. Just replace the DLL's in the "\_external" folder with your version
* Open the solution in Visual Studio and Build. The files should be deployed to your site after build
* If you do a release build, you should get an installer package too, but I usually create a module from the dnn-file.
* Put the module on a page and with a little luck...it will work.


